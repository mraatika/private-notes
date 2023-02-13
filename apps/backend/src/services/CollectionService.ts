import {
  QueryCommand,
  QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';
import { Collection, CollectionCreateRequestBody } from '../types';
import dbClient from '../db';
import NoteService from './NoteService';

const tableName = process.env.COLLECTIONS_TABLE;

const CollectionService = {
  async createCollection(initial: CollectionCreateRequestBody) {
    const now = Date.now();

    const params: UpdateCommandInput = {
      TableName: tableName,
      Key: {
        collectionId: uuid(),
      },
      ExpressionAttributeValues: {
        ':name': initial.name,
        ':now': now,
        ':active': 1,
      },
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      UpdateExpression:
        'SET active = :active, #name = :name, createdAt = :now, updatedAt = :now',
      ReturnValues: 'ALL_NEW',
    };

    const insert = await dbClient.send(new UpdateCommand(params));
    return insert.Attributes;
  },

  async getCollection(collectionId: string) {
    const params: QueryCommandInput = {
      TableName: tableName,
      ExpressionAttributeValues: {
        ':id': collectionId,
        ':active': 1,
      },
      KeyConditionExpression: 'collectionId = :id',
      FilterExpression: 'active = :active',
    };

    const data = await dbClient.send(new QueryCommand(params));
    const collection = data.Items?.[0];

    if (!collection) {
      return undefined;
    }

    const notes = await NoteService.listNotes(collectionId);
    return { ...collection, notes: notes ?? [] };
  },

  async listCollections() {
    const params: ScanCommandInput = {
      TableName: tableName,
      IndexName: 'ActiveCollections',
    };
    const data = await dbClient.send(new ScanCommand(params));
    return data.Items;
  },

  async updateCollection(collection: Collection) {
    const params: UpdateCommandInput = {
      TableName: tableName,
      Key: {
        collectionId: collection.collectionId,
      },
      ExpressionAttributeValues: {
        ':name': collection.name,
        ':updatedAt': Date.now(),
      },
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      UpdateExpression: 'SET #name = :name, updatedAt = :updatedAt',
      ReturnValues: 'ALL_NEW',
    };

    const update = await dbClient.send(new UpdateCommand(params));
    return update.Attributes;
  },

  async deleteCollection(collectionId: string) {
    const params: UpdateCommandInput = {
      TableName: tableName,
      Key: { collectionId },
      UpdateExpression: 'REMOVE active',
    };

    return dbClient.send(new UpdateCommand(params));
  },
};

export default CollectionService;
