import { APIGatewayEvent } from 'aws-lambda';
import { Note } from '../../types';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';
import NoteService from '../services/NoteService';

export const updateNote = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'PUT') {
    return methodNotAllowedResponse();
  }

  const body: Note = JSON.parse(event.body ?? '{}');

  console.info('updateNote(): Received request to update note', body);

  try {
    const update = await NoteService.updateNote(body);
    console.info(`updateNote(): Note updated successfully`, update);
    return successResponse(update);
  } catch (err) {
    console.info(`updateNote(): Updating note ${body.noteId} failed for`, err);
    return serverErrorResponse({ message: (err as Error).message });
  }
};
