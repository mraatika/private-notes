export interface PersistAdapter {
  put: <T = any>(key: string, data: T, props?: PersistProps) => void;
  get: <T = any>(key: string) => T | undefined;
  remove: (key: string) => void;
}

export interface PersistProps {
  maxAge?: number;
  expires?: number;
}
