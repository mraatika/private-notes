import { Note } from '../types';

export function mapNoteToDto(item: Partial<Note>) {
  const { active, ...rest } = item;
  return rest;
}
