import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import { components } from '../../types/api';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';

type Collection = components['schemas']['Collection'];

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.SAMPLE_TABLE;

export const updateCollection = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'PUT') {
    return methodNotAllowedResponse();
  }

  console.info(
    'updateCollection(): Received request to update collection',
    event.body,
  );

  const body: Collection = JSON.parse(event.body ?? '{}');
  const update: Collection = { ...body, updatedAt: new Date().toUTCString() };

  const params = {
    TableName: tableName,
    Item: update,
  };

  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.info(`updateCollection(): Collection updated successfully`, data);
    return successResponse(update);
  } catch (err) {
    console.info(
      `updateCollection(): Updating collection ${body.id} failed for`,
      err,
    );
    return serverErrorResponse({ message: (err as Error).message });
  }
};
