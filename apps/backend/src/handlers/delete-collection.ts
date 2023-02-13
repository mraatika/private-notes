import { APIGatewayEvent } from 'aws-lambda';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';
import CollectionService from '../services/CollectionService';

export const deleteCollection = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'DELETE') {
    return methodNotAllowedResponse();
  }
  const collectionId = event.pathParameters?.collectionId as string;

  console.info(
    'deleteCollection(): Received request for collection:',
    collectionId,
  );

  try {
    await CollectionService.deleteCollection(collectionId);
    return successResponse({ id: collectionId });
  } catch (err) {
    console.log(
      `deleteCollection(): Deleting collection ${collectionId} failed for`,
      err,
    );
    return serverErrorResponse({ message: (err as Error).message });
  }
};
