import cors, { CorsOptions } from 'cors';
import dotenv from './dotenv';

const whitelist = [
  `http://localhost:${dotenv.PORT}`,
  `localhost:${dotenv.PORT}`,
];

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (
      whitelist.indexOf(origin ?? '') !== -1 ||
      (dotenv.APP_ENV === 'dev' && !origin)
    ) {
      callback(null, true);
    } else {
      const error = new Error('Not allowed by CORS');
      error.name = 'CORS_ERROR';
      callback(error);
    }
  },
  credentials: true,
};

export default cors(corsOptions);
