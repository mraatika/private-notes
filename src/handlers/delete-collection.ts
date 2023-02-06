import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import {
  methodNotAllowedResponse,
  serverErrorResponse,
  successResponse,
} from '../responses';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.SAMPLE_TABLE;

export const deleteCollection = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'DELETE') {
    return methodNotAllowedResponse();
  }
  const id = event.pathParameters?.collectionId;

  console.info('deleteCollection(): Received request for collection:', id);

  const params = {
    TableName: tableName,
    Key: { id },
  };

  try {
    await ddbDocClient.send(new DeleteCommand(params));
    return successResponse({ id });
  } catch (err) {
    console.log(
      `deleteCollection(): Deleting collection ${id} failed for`,
      err,
    );
    return serverErrorResponse({ message: (err as Error).message });
  }
};
