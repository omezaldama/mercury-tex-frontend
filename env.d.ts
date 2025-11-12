/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VENUS_BACKEND_URL: string;
  readonly VITE_REFRESH_TOKEN_MS: number;
  readonly VITE_ACCESS_CONTROL_ALLOW_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
