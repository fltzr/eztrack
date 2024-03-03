/* eslint-disable @typescript-eslint/consistent-type-definitions */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_APP_VERSION: string;
  VITE_APP_BUILD: string;
  VITE_APP_ENV: string;
  VITE_APP_API: string;
  VITE_APP_API_VERSION: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
