import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { components, operations } from '../../types/api';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';

type Collection = components['schemas']['Collection'];
type RequestBody =
  operations['createCollection']['requestBody']['content']['application/json'];

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.SAMPLE_TABLE;

export const createCollection = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'POST') {
    return methodNotAllowedResponse();
  }

  const body: RequestBody = JSON.parse(event.body ?? '{}');

  console.info(
    'createCollection(): Received request to create collection',
    body,
  );

  const insert: Collection = {
    ...body,
    id: uuid(),
    createdAt: new Date().toUTCString(),
  };

  const params = {
    TableName: tableName,
    Item: insert,
  };

  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.info(`createCollection(): Collection updated successfully`, data);
    return successResponse(insert);
  } catch (err) {
    console.info(
      `createCollection(): Creating collection ${body.name} failed for`,
      err,
    );
    return serverErrorResponse({ message: (err as Error).message });
  }
};
