/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
