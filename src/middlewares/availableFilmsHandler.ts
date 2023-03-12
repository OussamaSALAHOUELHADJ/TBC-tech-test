import { Request, Response, NextFunction } from 'express';
import availableFilms from '../databases/availableFilms.json';

export function availableFilmsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let film;
  const filmId = req.params.filmId;
  try {
    film = availableFilms.find((f) => f.id === filmId);
  } catch (error) {
    next(error);
  }

  if (film) {
    next(film);
  } else {
    return res.redirect(301, `${req.baseUrl}?search=${filmId}`);
  }
}
