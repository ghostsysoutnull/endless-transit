/**
 * Which build this is: replaced at build time by Vite `define` from the ET_BUILD environment variable
 * (`npm run publish:site` sets it to the commit of the source); `dev` otherwise. Read only by `main.ts`.
 */
declare const __ET_BUILD__: string;
