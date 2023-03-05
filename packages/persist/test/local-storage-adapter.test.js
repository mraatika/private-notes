import { describe, test, expect, vi, beforeEach } from 'vitest';
import SUT from '../lib/adapters/localStorage';

describe('localStorageAdapter', () => {
  const now = 1678007786874;
  const storage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  };

  beforeEach(() => {
    vi.stubGlobal('localStorage', storage);
    vi.stubGlobal('Date', { now: () => now });
    vi.resetAllMocks();
  });

  describe('put', () => {
    test('persist a value by key', () => {
      SUT.put('my-key', { value: 1 });
      expect(storage.setItem).toHaveBeenCalledWith(
        'my-key',
        expect.any(String),
      );
    });

    test('expiry date from expiry prop', () => {
      const expires = now + 1000;
      const value = { value: 1 };
      const expected = { expires, data: value };

      SUT.put('my-key', value, { expires });
      expect(storage.setItem).toBeCalledWith(
        'my-key',
        JSON.stringify(expected),
      );
    });

    test('expiry of zero', () => {
      const expires = 0;
      const value = { value: 1 };
      const expected = { expires: now, data: value };

      SUT.put('my-key', value, { expires });
      expect(storage.setItem).toBeCalledWith(
        'my-key',
        JSON.stringify(expected),
      );
    });

    test('expiry date from maxAge prop', () => {
      const maxAge = 1000;
      const value = { value: 1 };
      const expected = {
        expires: now + maxAge,
        data: value,
      };

      SUT.put('my-key', value, { maxAge });
      expect(storage.setItem).toBeCalledWith(
        'my-key',
        JSON.stringify(expected),
      );
    });

    test('maxAge of zero', () => {
      const maxAge = 0;
      const value = { value: 1 };
      const expected = {
        expires: now,
        data: value,
      };

      SUT.put('my-key', value, { maxAge });
      expect(storage.setItem).toBeCalledWith(
        'my-key',
        JSON.stringify(expected),
      );
    });

    test('both maxAge and expires', () => {
      const maxAge = 1000;
      const expires = now + 500;
      const value = { value: 1 };
      const expected = {
        expires: now + maxAge,
        data: value,
      };

      SUT.put('my-key', value, { maxAge, expires });
      expect(storage.setItem).toBeCalledWith(
        'my-key',
        JSON.stringify(expected),
      );
    });
  });

  describe('get', () => {
    test('return a non expired item from storage', () => {
      const expected = { value: 1 };
      const item = { expires: now + 1000, data: expected };
      storage.getItem.mockReturnValueOnce(JSON.stringify(item));
      const actual = SUT.get('my-key');
      expect(actual).toEqual(expected);
    });

    test('is valid when now equals expiry', () => {
      const expected = { value: 1 };
      const item = { expires: now, data: expected };
      storage.getItem.mockReturnValueOnce(JSON.stringify(item));
      const actual = SUT.get('my-key');
      expect(actual).toEqual(expected);
    });

    test('no item found', () => {
      storage.getItem.mockReturnValueOnce(null);
      const result = SUT.get('my-key');
      expect(result).toEqual(undefined);
    });

    test('return undefined when item is expired', () => {
      const item = { expires: now - 1000, data: { value: 1 } };
      storage.getItem.mockReturnValueOnce(JSON.stringify(item));
      const actual = SUT.get('my-key');
      expect(actual).toEqual(undefined);
    });

    test('remove item when it is expired', () => {
      const item = { expires: now - 1000, data: { value: 1 } };
      storage.getItem.mockReturnValueOnce(JSON.stringify(item));
      SUT.get('my-key');
      expect(storage.removeItem).toHaveBeenCalledWith('my-key');
    });
  });

  describe('remove', () => {
    test('remove item', () => {
      SUT.remove('my-key');
      expect(storage.removeItem).toHaveBeenCalledWith('my-key');
    });

    test('returns undefined', () => {
      const actual = SUT.remove('my-key');
      expect(actual).toBe(undefined);
    });
  });
});
