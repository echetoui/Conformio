/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOTION_API_KEY: string;
  readonly VITE_NOTION_DATABASE_ID: string;
  // Ajoutez d'autres variables d'environnement ici si nécessaire
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
