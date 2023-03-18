import { AvailableFilm } from './../types';
import { Router, Request, Response, NextFunction } from 'express';
import { availableFilmsHandler } from '../middlewares';
import { OmdbFilm } from './../models';
import {
  getFilmListMiddleware,
  updateGoogleSheetMiddleware,
  requestedMetaMiddleware,
} from '../middlewares';

const router = Router();
router.get(
  '/:filmId',
  availableFilmsHandler,
  getFilmListMiddleware,
  requestedMetaMiddleware,
  async (err: Error, req: Request, res: Response, next: NextFunction) => {
    const filmId = req.params.filmId;
    const film: AvailableFilm = res.locals.film;
    if (err.name === 'ERROR_FILM_NOT_AVAILABLE') {
      return res
        .status(404)
        .json({ message: `the movie ${film.title} doesn't exist` });
    }
    if (err.name === 'ERROR_FILM_NOT_FOUND') {
      return res.redirect(301, `${req.baseUrl}?search=${filmId}`);
    }
    next(err);
  },
  async (req: Request, res: Response) => {
    const film: AvailableFilm = res.locals.film;
    const filmList: OmdbFilm[] = res.locals.filmList;

    const totalResults = filmList.length;
    return res.status(200).json({
      title: film.title,
      id: film.id,
      data: filmList,
      totalResults,
    });
  }
);

router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const search = req.query.search?.toString() ?? '';

    const filmToSearch: AvailableFilm = {
      id: search,
      title: search,
      OmdbQuerySearch: search,
    };
    res.locals.film = filmToSearch;
    next();
  },
  getFilmListMiddleware,
  async (err: Error, req: Request, res: Response, next: NextFunction) => {
    const film: AvailableFilm = res.locals.film;
    if (err.name === 'ERROR_FILM_NOT_FOUND') {
      return res
        .status(404)
        .json({ message: `there's no results for: ${film.title}` });
    }
    if (err.name === 'ERROR_FILM_NOT_AVAILABLE') {
      return res
        .status(404)
        .json({ message: `the movie ${film.title} doesn't exist` });
    }
    next(err);
  },
  async (req: Request, res: Response) => {
    const film: AvailableFilm = res.locals.film;
    const filmList: OmdbFilm[] = res.locals.filmList;
    const totalResults = filmList.length;
    res
      .status(200)
      .json({ title: film.title, id: film.id, data: filmList, totalResults });
  }
);

router.post(
  '/:filmId/backup',
  availableFilmsHandler,
  getFilmListMiddleware,
  requestedMetaMiddleware,
  updateGoogleSheetMiddleware,
  async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'ERROR_FILM_NOT_FOUND') {
      return res.status(405).json({ message: 'cannot backup this film.' });
    }
    next(err);
  },
  async (req: Request, res: Response) => {
    const updatedSheet = res.locals.sharedSheet;

    res.status(201).json({
      message: `the movie ${updatedSheet?.properties?.title} was backed up successfully`,
      id: updatedSheet?.spreadsheetId,
      url: updatedSheet?.spreadsheetUrl,
    });
  }
);

export { router as filmRoutes };
