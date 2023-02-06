import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.SAMPLE_TABLE;

export const getCollection = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') {
    return methodNotAllowedResponse();
  }
  const id = event.pathParameters?.collectionId;

  console.info('getCollection(): Received request for collection:', id);

  const params = {
    TableName: tableName,
    Key: { id },
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    const item = data.Item;
    return successResponse(item);
  } catch (err) {
    console.log(`getCollection(): Getting collection ${id} failed for`, err);
    return serverErrorResponse({ message: (err as Error).message });
  }
};
