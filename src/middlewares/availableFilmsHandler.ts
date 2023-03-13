import { Request, Response, NextFunction } from 'express';
import availableFilms from '../databases/availableFilms.json';
import { AvailableFilm } from './../types';

export function availableFilmsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let film: AvailableFilm | undefined = undefined;
  const filmId = req.params.filmId;
  try {
    film = availableFilms.find((f) => f.id === filmId);

    res.locals.film = film;
    next();
  } catch (error) {
    next(error);
  }
}
