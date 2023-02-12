import { APIGatewayEvent } from 'aws-lambda';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';
import NoteService from '../services/NoteService';

export const listNotes = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') {
    return methodNotAllowedResponse();
  }

  const collectionId = event.pathParameters?.collectionId as string;

  console.info(
    `listNotes(): Received request to list notes for collection ${collectionId}`,
  );

  try {
    const items = await NoteService.listNotes(collectionId);
    console.info(`listNotes(): Found ${items?.length} collection(s)`);
    return successResponse(items);
  } catch (err) {
    console.info(`listNotes(): Listing collections failed for`, err);
    return serverErrorResponse({ message: (err as Error).message });
  }
};
