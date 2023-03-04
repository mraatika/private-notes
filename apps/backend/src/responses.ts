import type { ServerError } from 'private-notes-api';

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
  'Access-Control-Allow-Headers': '*',
};

export const methodNotAllowedResponse = () => ({
  statusCode: 405,
  headers: corsHeaders,
});

export const successResponse = (body: unknown) => ({
  statusCode: 200,
  body: JSON.stringify(body),
  headers: corsHeaders,
});

export const serverErrorResponse = (body: ServerError) => ({
  statusCode: 500,
  body: JSON.stringify(body),
  headers: corsHeaders,
});

export const validationErrorResponse = (body: ServerError) => ({
  statusCode: 400,
  body: JSON.stringify(body),
  headers: corsHeaders,
});

export const notFoundResponse = (body: ServerError) => ({
  statusCode: 404,
  body: JSON.stringify(body),
  headers: corsHeaders,
});
