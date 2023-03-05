import { expect, describe, test, vi, beforeEach } from 'vitest';
import { createApiAdapter } from './api';

describe('Api', () => {
  const fetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetch);
    vi.resetAllMocks();
  });

  describe('getCollections', () => {
    describe('without persisting', () => {
      const SUT = createApiAdapter();
      const resultStub = vi.fn();

      describe('success', () => {
        beforeEach(() => {
          fetch.mockResolvedValueOnce({ ok: true, json: resultStub });
        });

        test('calls collection endpoint with baseUrl', async () => {
          await SUT.getCollections({ baseUrl: 'api' });
          expect(fetch.mock.lastCall[0]).toEqual('api/collections');
        });

        test('request headers', async () => {
          await SUT.getCollections({ baseUrl: 'api' });
          expect(fetch.mock.lastCall[1].headers).toEqual({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          });
        });

        test('response body', async () => {
          const value = { collectionId: '1' };
          resultStub.mockResolvedValueOnce(value);
          const response = await SUT.getCollections({ baseUrl: 'api' });
          expect(response).toEqual(value);
        });
      });

      describe('failure', () => {
        test('response ok is falsy', async () => {
          fetch.mockResolvedValueOnce({
            ok: false,
            json: vi.fn().mockResolvedValueOnce({ message: 'ERROR' }),
          });

          await expect(SUT.getCollections({ baseUrl: '' })).rejects.toThrow(
            new Error('ERROR'),
          );
        });

        test('fetch rejects', async () => {
          fetch.mockRejectedValueOnce(new Error('FETCH_ERROR'));
          await expect(SUT.getCollections({ baseUrl: '' })).rejects.toThrow(
            new Error('FETCH_ERROR'),
          );
        });
      });
    });

    describe('with persisting', () => {
      const storageAdapter = {
        put: vi.fn(),
        get: vi.fn(),
      };

      const SUT = createApiAdapter(storageAdapter);
      const apiResponse = { collectionId: '1' };

      describe('success', () => {
        beforeEach(() => {
          fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(apiResponse),
          });
        });

        test('result found from local cache', async () => {
          const value = { collectionId: '2' };
          storageAdapter.get.mockReturnValueOnce(value);
          const response = await SUT.getCollections({ baseUrl: 'api' });
          expect(response).toEqual(value);
        });

        test('result not found from local cache', async () => {
          const response = await SUT.getCollections({ baseUrl: 'api' });
          expect(response).toEqual(apiResponse);
        });

        test('saves the result', async () => {
          await SUT.getCollections({ baseUrl: 'api' });
          expect(storageAdapter.put).toHaveBeenLastCalledWith(
            'collections',
            apiResponse,
            expect.any(Object),
          );
        });

        test('default expiry', async () => {
          await SUT.getCollections({ baseUrl: 'api' });
          expect(storageAdapter.put.mock.lastCall[2]).toEqual({
            maxAge: Infinity,
          });
        });

        test('set expiry', async () => {
          await SUT.getCollections({ baseUrl: 'api' }, { maxAge: 1000 });
          expect(storageAdapter.put.mock.lastCall[2]).toEqual({
            maxAge: 1000,
          });
        });
      });

      describe('failure', () => {
        test('response ok is falsy', async () => {
          fetch.mockResolvedValueOnce({
            ok: false,
            json: vi.fn().mockResolvedValueOnce({ message: 'ERROR' }),
          });

          try {
            await SUT.getCollections({ baseUrl: '' });
          } catch (e) {
            expect(storageAdapter.put).not.toHaveBeenCalled();
          }

          expect.assertions(1);
        });

        test('response ok is falsy', async () => {
          fetch.mockRejectedValueOnce(new Error('FETCH_ERROR'));

          try {
            await SUT.getCollections({ baseUrl: '' });
          } catch (e) {
            expect(storageAdapter.put).not.toHaveBeenCalled();
          }

          expect.assertions(1);
        });
      });
    });
  });

  describe('getCollection', () => {
    describe('without persisting', () => {
      const SUT = createApiAdapter();
      const resultStub = vi.fn();

      beforeEach(() => {
        fetch.mockResolvedValueOnce({ ok: true, json: resultStub });
      });

      test('calls collection endpoint with baseUrl', async () => {
        await SUT.getCollection('collection-1', { baseUrl: 'api' });
        expect(fetch.mock.lastCall[0]).toEqual('api/collections/collection-1');
      });

      test('request headers', async () => {
        await SUT.getCollection('collection-1', { baseUrl: 'api' });
        expect(fetch.mock.lastCall[1].headers).toEqual({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        });
      });

      test('response body', async () => {
        const value = { collectionId: '1' };
        resultStub.mockResolvedValueOnce(value);
        const response = await SUT.getCollection('collection-1', {
          baseUrl: 'api',
        });
        expect(response).toEqual(value);
      });
    });

    describe('with persisting', () => {
      const storageAdapter = {
        put: vi.fn(),
        get: vi.fn(),
      };

      const SUT = createApiAdapter(storageAdapter);
      const apiResponse = { collectionId: '1' };

      beforeEach(() => {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(apiResponse),
        });
      });

      test('saves the result', async () => {
        await SUT.getCollection('collection-1', { baseUrl: 'api' });
        expect(storageAdapter.put).toHaveBeenLastCalledWith(
          'collections/collection-1',
          apiResponse,
          expect.any(Object),
        );
      });

      test('default expiry', async () => {
        await SUT.getCollection('collection-1', { baseUrl: 'api' });
        expect(storageAdapter.put.mock.lastCall[2]).toEqual({
          maxAge: 30 * 1000,
        });
      });

      test('set expiry', async () => {
        await SUT.getCollection(
          'collection-1',
          { baseUrl: 'api' },
          { maxAge: 1000 },
        );
        expect(storageAdapter.put.mock.lastCall[2]).toEqual({
          maxAge: 1000,
        });
      });
    });
  });
});
