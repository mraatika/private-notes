import type { PersistProps } from '../PersistAdapter';

/**
 * Resolve expiration date for a data entry in ms since the epoch
 * @param props
 * @returns
 */
export function resolveExpiry(props?: PersistProps) {
  const now = Date.now();

  if (props?.maxAge) {
    return now + props.maxAge;
  }

  if (props?.expires) {
    return props.expires;
  }

  return now;
}
