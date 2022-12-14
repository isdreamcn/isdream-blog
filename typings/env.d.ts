/// <reference types="vite/client" />

type DefineEnv = Readonly<{
  VITE_APP_TITLE: string
  VITE_USE_MOCK: boolean
  VITE_BASE_URL_API: string
  VITE_BASE_URL_FILE: string
}>

// loadEnv(mode, process.cwd()) || import.meta.env
type LoadViteEnv = {
  readonly [P in keyof DefineEnv]: string
}

interface ImportMetaEnv extends LoadViteEnv, {} {}

interface ViteEnv extends DefineEnv, ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
