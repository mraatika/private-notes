import { components } from '../types/api';
type ErrorResponseBody = components['schemas']['Error'];

const defaultHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
};

const withDefaultHeaders = (response: Record<string, unknown>) => ({
  ...response,
  headers: { ...(response.headers ?? {}), ...defaultHeaders },
});

export const methodNotAllowedResponse = () =>
  withDefaultHeaders({ statusCode: 405 });

export const successResponse = (body: unknown) =>
  withDefaultHeaders({
    statusCode: 200,
    body: JSON.stringify(body),
  });

export const serverErrorResponse = (body: ErrorResponseBody) =>
  withDefaultHeaders({
    statusCode: 500,
    body: JSON.stringify(body),
  });
