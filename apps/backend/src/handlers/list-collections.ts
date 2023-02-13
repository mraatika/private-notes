import { APIGatewayEvent } from 'aws-lambda';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';
import CollectionService from '../services/CollectionService';

export const listCollections = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') {
    return methodNotAllowedResponse();
  }

  console.info('listCollections(): Received request to list collections');

  try {
    const items = await CollectionService.listCollections();
    console.info(`listCollections(): Found ${items?.length} collection(s)`);
    return successResponse(items);
  } catch (err) {
    console.info(`listCollections(): Listing collections failed for`, err);
    return serverErrorResponse({ message: (err as Error).message });
  }
};
