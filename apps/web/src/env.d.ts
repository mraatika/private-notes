/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_API_KEY: string;
  readonly VITE_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
