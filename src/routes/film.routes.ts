import { AvailableFilm } from './../types/availableFilms';
import { FilmController } from './../controllers/FilmController';
import { Router, Request, Response, NextFunction } from 'express';
import { availableFilmsHandler } from '../middlewares/availableFilmsHandler';

const router = Router();

router.get(
  '/:filmId',
  availableFilmsHandler,
  async (
    film: AvailableFilm,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const filmCntr = new FilmController();
    try {
      const films = await filmCntr.getFilm(film.OmdbQuerySearch, film.type);
      const totalResults = films.length;
      if (totalResults) {
        return res
          .status(200)
          .json({ title: film.title, id: film.id, films, totalResults });
      } else {
        return res
          .status(404)
          .json({ message: `the movie ${film.title} doesn't exist` });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const filmCntr = new FilmController();
  const search = req.query.search?.toString() ?? '';
  try {
    const films = await filmCntr.getFilm(search ?? '');

    const totalResults = films.length;
    if (totalResults) {
      res.status(200).json({ title: search, films, totalResults });
    } else {
      res.status(404).json({ message: `there's no results for: ${search}` });
    }
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id/backup',
  availableFilmsHandler,
  async (
    film: AvailableFilm,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const filmCntr = new FilmController();
    if (film) {
      //TODO: backup to Google Spreadsheet.
    } else {
      //TODO: return a 405 Method Not Allowed status
    }
  }
);

export { router as filmRoutes };
