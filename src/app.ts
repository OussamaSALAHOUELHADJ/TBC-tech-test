import express from 'express';
import compression from 'compression';
import { cors, hlmt as helmet, limiter } from './config';
import { errorHandler, notFoundHandler } from './middlewares';
import { filmRoutes, indexRoutes } from './routes';

// Create Express app
const app = express();

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(helmet);
app.use(limiter);
app.use(compression());

app.use('/', indexRoutes);
app.use('/films', filmRoutes);

// 404 error handler
app.use(notFoundHandler);

// Generic error handler
app.use(errorHandler);

export { app };
