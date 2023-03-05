export type PersistProps =
  | {
      maxAge: number;
      expires?: never;
    }
  | {
      maxAge?: never;
      expires: number;
    };

/**
 * An adapter for persisting stuff locally, e.g. api responses
 */
export interface PersistAdapter {
  /**
   * Persist <data> using retrieve key <key>
   * @param key
   * @param data
   * @param props
   * @returns
   */
  put: <T = any>(key: string, data: T, props?: PersistProps) => void;
  /**
   * Get persisted data by it's <key>
   * @param key
   * @returns
   */
  get: <T = any>(key: string) => T | undefined;
  /**
   * Remove persisted data by it's <key>
   * @param key
   * @returns
   */
  remove: (key: string) => void;
}
