import {
  UpdateCommand,
  UpdateCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';
import { Note, NoteCreateRequestBody } from '../../types';
import dbClient from '../db';
import { mapNoteToDto } from './ResultMapper';

const tableName = process.env.NOTES_TABLE;

const NoteService = {
  async createNote(initial: NoteCreateRequestBody) {
    const now = Date.now();

    const params: UpdateCommandInput = {
      TableName: tableName,
      Key: {
        collectionId: initial.collectionId,
        noteId: uuid(),
      },
      ExpressionAttributeValues: {
        ':title': initial.title,
        ':content': initial.content,
        ':now': now,
        ':active': 1,
        ':tags': [],
      },
      UpdateExpression:
        'SET active = :active, title = :title, content = :content, tags = :tags, createdAt = :now, updatedAt = :now',
      ReturnValues: 'ALL_NEW',
    };

    const insert = await dbClient.send(new UpdateCommand(params));
    return mapNoteToDto(insert.Attributes as Note);
  },

  async listNotes(collectionId: string) {
    const params: QueryCommandInput = {
      TableName: tableName,
      ExpressionAttributeValues: {
        ':cid': collectionId,
        ':active': 1,
      },
      KeyConditionExpression: 'collectionId = :cid',
      FilterExpression: 'active = :active',
    };
    const data = await dbClient.send(new QueryCommand(params));
    return data.Items;
  },

  async updateNote(note: Note) {
    const params: UpdateCommandInput = {
      TableName: tableName,
      Key: {
        collectionId: note.collectionId,
        noteId: note.noteId,
      },
      ExpressionAttributeValues: {
        ':title': note.title,
        ':content': note.content,
        ':tags': note.tags,
        ':now': Date.now(),
      },
      UpdateExpression:
        'SET title = :title, content = :content, tags = :tags, updatedAt = :now',
      ReturnValues: 'ALL_NEW',
    };

    console.log('updateNote(): UpdateCommand', params);

    const update = await dbClient.send(new UpdateCommand(params));
    return mapNoteToDto(update.Attributes as Note);
  },

  async deleteNote(collectionId: string, noteId: string) {
    const params: UpdateCommandInput = {
      TableName: tableName,
      Key: { collectionId, noteId },
      UpdateExpression: 'REMOVE active',
    };

    return dbClient.send(new UpdateCommand(params));
  },
};

export default NoteService;
