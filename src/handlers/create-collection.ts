import { APIGatewayEvent } from 'aws-lambda';
import { CollectionInitObject } from '../../types';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';
import CollectionService from '../services/CollectionService';

export const createCollection = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'POST') {
    return methodNotAllowedResponse();
  }

  const body: CollectionInitObject = JSON.parse(event.body ?? '{}');

  console.info(
    'createCollection(): Received request to create collection',
    body,
  );

  try {
    const entity = await CollectionService.createCollection(body);
    console.info(`createCollection(): Collection updated successfully`, entity);
    return successResponse(entity);
  } catch (err) {
    console.info(
      `createCollection(): Creating collection ${body.name} failed for`,
      err,
    );
    return serverErrorResponse({ message: (err as Error).message });
  }
};
