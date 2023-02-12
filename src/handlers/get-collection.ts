import { APIGatewayEvent } from 'aws-lambda';
import {
  methodNotAllowedResponse,
  notFoundResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';
import CollectionService from '../services/CollectionService';

export const getCollection = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') {
    return methodNotAllowedResponse();
  }
  const collectionId = event.pathParameters?.collectionId as string;

  console.info(
    'getCollection(): Received request for collection:',
    collectionId,
  );

  try {
    const collection = await CollectionService.getCollection(collectionId);
    return collection
      ? successResponse(collection)
      : notFoundResponse({ message: `Item ${collectionId} not found` });
  } catch (err) {
    console.log(
      `getCollection(): Getting collection ${collectionId} failed for`,
      err,
    );
    return serverErrorResponse({ message: (err as Error).message });
  }
};
