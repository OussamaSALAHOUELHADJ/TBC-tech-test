import { AvailableFilm } from './../types';
import { FilmController } from './../controllers';
import { Request, Response, NextFunction } from 'express';
export async function getFilmListMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const film: AvailableFilm = res.locals.film;
  if (film) {
    const filmCntr = new FilmController();

    try {
      const films = await filmCntr.searchFilmList(
        film.OmdbQuerySearch,
        film.type
      );

      const totalResults = films.length;
      if (totalResults) {
        res.locals.filmList = films;

        next();
      } else {
        const error = new Error();
        error.name = 'ERROR_FILM_NOT_AVAILABLE';
        next(error);
      }
    } catch (error) {
      next(error);
    }
  } else {
    const error = new Error();
    error.name = 'ERROR_FILM_NOT_FOUND';
    next(error);
  }
}
