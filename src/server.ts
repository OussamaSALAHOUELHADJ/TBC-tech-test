import { app } from './app';
import { dotenv } from './config';

const port = dotenv.PORT;

const server = app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (err: Error) => {
  // eslint-disable-next-line
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
