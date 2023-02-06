import { APIGatewayEvent } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.SAMPLE_TABLE;

export const listCollections = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') {
    return methodNotAllowedResponse();
  }

  console.info('listCollections(): received', event);

  const params = {
    TableName: tableName,
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    const items = data.Items;

    console.info(`listCollections(): Found ${items?.length} collection(s)`);
    return successResponse(items);
  } catch (err) {
    console.info(`listCollections(): Listing collections failed for`, err);
    return serverErrorResponse({ message: (err as Error).message });
  }
};
