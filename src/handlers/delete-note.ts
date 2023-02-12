import { APIGatewayEvent } from 'aws-lambda';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';
import NoteService from '../services/NoteService';

export const deleteNote = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'DELETE') {
    return methodNotAllowedResponse();
  }

  const collectionId = event.pathParameters?.collectionId as string;
  const noteId = event.pathParameters?.noteId as string;

  console.info('deleteNote(): Received request for collection:', collectionId);

  try {
    await NoteService.deleteNote(collectionId, noteId);
    return successResponse({ id: noteId });
  } catch (err) {
    console.log(
      `deleteNote(): Deleting note ${collectionId}#${noteId} failed for`,
      err,
    );

    return serverErrorResponse({ message: (err as Error).message });
  }
};
