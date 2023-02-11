import { components } from '../types/api';
type ErrorResponseBody = components['schemas']['Error'];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
  'Access-Control-Allow-Headers': '*',
};

const withCorsHeaders = (response: Record<string, unknown>) => ({
  ...response,
  headers: { ...(response.headers ?? {}), ...corsHeaders },
});

export const methodNotAllowedResponse = () =>
  withCorsHeaders({ statusCode: 405 });

export const successResponse = (body: unknown) =>
  withCorsHeaders({
    statusCode: 200,
    body: JSON.stringify(body),
  });

export const serverErrorResponse = (body: ErrorResponseBody) =>
  withCorsHeaders({
    statusCode: 500,
    body: JSON.stringify(body),
  });

export const notFoundResponse = (body: ErrorResponseBody) =>
  withCorsHeaders({
    statusCode: 404,
    body: JSON.stringify(body),
  });
