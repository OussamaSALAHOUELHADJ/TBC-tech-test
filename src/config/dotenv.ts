import dotenv from 'dotenv';

const params: dotenv.DotenvConfigOptions = { path: '.env.local' };

dotenv.config(params);

export default {
  PORT: process.env.PORT || 3000,
  APP_ENV: process.env.APP_ENV,
};