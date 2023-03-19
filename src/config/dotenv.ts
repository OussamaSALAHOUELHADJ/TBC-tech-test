import dotenv from 'dotenv';

const params: dotenv.DotenvConfigOptions = {
  path: process.env.APP_ENV === 'dev' ? '.env.local' : '.env',
};

dotenv.config(params);

const envVars = {
  PORT: process.env.PORT || 3000,
  APP_ENV: process.env.APP_ENV,
  OMDB_API_KEY: process.env.OMDB_API_KEY,
  GOOGLE_API_PRIVATE_KEY: process.env.GOOGLE_API_PRIVATE_KEY,
  GOOGLE_API_EMAIL: process.env.GOOGLE_API_EMAIL,
  PROJECT_WEBSITE: 'https://github.com/OussamaSALAHOUELHADJ/TBC-tech-test',
};
export { envVars as dotenv };
