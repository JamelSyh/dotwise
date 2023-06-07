/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_LRT_OR_RTL: "rtl" | "ltr";
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
