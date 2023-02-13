import { APIGatewayEvent } from 'aws-lambda';
import { NoteCreateRequestBody } from '../types';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
  validationErrorResponse,
} from '../responses';
import NoteService from '../services/NoteService';

export const createNote = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'POST') {
    return methodNotAllowedResponse();
  }

  const collectionId = event.pathParameters?.collectionId as string;
  const body: NoteCreateRequestBody = JSON.parse(event.body ?? '{}');

  if (body.collectionId !== collectionId) {
    return validationErrorResponse({
      message: 'collectionId is invalid!',
    });
  }

  console.info('createNote(): Received request to create collection', body);

  try {
    const entity = await NoteService.createNote(body);
    console.info(`createNote(): Note created successfully`, entity);
    return successResponse(entity);
  } catch (err) {
    console.info(`createNote(): Creating note ${body.title} failed for`, err);
    return serverErrorResponse({ message: (err as Error).message });
  }
};
