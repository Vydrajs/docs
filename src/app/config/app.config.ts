/**
 * Expose here the .env config that you want be in the app in runtime
 */

/**
 * .env file config
 */
const config = (import.meta as any).env;

export const appConfig = {
  basePath: config.VITE_BASE_PATH as string,
  localesPath: config.VITE_LOCALES_PATH as string,
};
