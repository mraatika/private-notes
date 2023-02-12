import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { Collection, SimpleCollection } from '../../types';

function extractProp(item: Record<string, AttributeValue>, propName: string) {
  const value = item[propName];
  return value?.S ?? value?.N ?? undefined;
}

function extractProps(
  item: Record<string, AttributeValue>,
  propNames: string[],
) {
  const props = {} as Record<string, unknown>;

  for (const propName of propNames) {
    props[propName] = extractProp(item, propName);
  }

  return props;
}

export function mapCollectionListItem(
  item: Record<string, AttributeValue>,
): SimpleCollection {
  return extractProps(item, ['collectionId', 'name']);
}

export function mapCollection(
  item: Record<string, AttributeValue>,
): Collection {
  return {
    ...mapCollectionListItem(item),
    ...extractProps(item, ['createdAt', 'updatedat', 'notes']),
  };
}
