import { APIGatewayEvent } from 'aws-lambda';
import { Collection } from '../../types';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';
import CollectionService from '../services/CollectionService';

export const updateCollection = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'PUT') {
    return methodNotAllowedResponse();
  }

  console.info(
    'updateCollection(): Received request to update collection',
    event.body,
  );

  const body: Collection = JSON.parse(event.body ?? '{}');

  try {
    const update = await CollectionService.updateCollection(body);
    console.info(`updateCollection(): Collection updated successfully`, update);
    return successResponse(update);
  } catch (err) {
    console.info(
      `updateCollection(): Updating collection ${body.collectionId} failed for`,
      err,
    );
    return serverErrorResponse({ message: (err as Error).message });
  }
};
