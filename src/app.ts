import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { cors } from './config';
import { errorHandler, notFoundHandler } from './middlewares';
import { filmRoutes, indexRoutes } from './routes';

// Create Express app
const app = express();

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(helmet());
app.use(compression());

app.use('/', indexRoutes);
app.use('/films', filmRoutes);

// 404 error handler
app.use(notFoundHandler);

// Generic error handler
app.use(errorHandler);

export { app };
