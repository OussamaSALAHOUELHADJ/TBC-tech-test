import dotenv from 'dotenv';

const params: dotenv.DotenvConfigOptions = { path: '.env.local' };

dotenv.config(params);

const envVars = {
  PORT: process.env.PORT || 3000,
  APP_ENV: process.env.APP_ENV,
  OMDB_API_KEY: process.env.OMDB_API_KEY,
  GOOGLE_API_PRIVATE_KEY: process.env.GOOGLE_API_PRIVATE_KEY,
  GOOGLE_API_EMAIL: process.env.GOOGLE_API_EMAIL,
};
export { envVars as dotenv };
