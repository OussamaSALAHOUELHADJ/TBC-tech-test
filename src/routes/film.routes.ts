import { Router, Request, Response, NextFunction } from 'express';
import { OmdbFilm } from './../models';
import {

const router = Router();

router.get(
  '/:filmId',
  availableFilmsHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    const film = res.locals.film;
    const filmList: OmdbFilm[] = res.locals.filmList;
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
    } else {
      return res.redirect(301, `${req.baseUrl}?search=${filmId}`);
    }
  }
);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const filmCntr = new FilmController();
  const search = req.query.search?.toString() ?? '';
    const filmList: OmdbFilm[] = res.locals.filmList;
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

router.post(
  '/:filmId/backup',
  availableFilmsHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    const film = res.locals.film;

    if (film) {
      try {
        const createdSheet = await createSheetIfNotExist({
          sheetName: film.id,
          options: {
            permissions: { permissions: UserToGrantPermissions },
          },
        });

        const sheetId = createdSheet?.spreadsheetId;
        if (sheetId) {
          const filmCntr = new FilmController();
          const films = await filmCntr.getFilm(film.OmdbQuerySearch, film.type);
          const transformedData = jsonTo2DimArray(films);
          await updateSheet({
            spreadsheetId: sheetId,
            values: transformedData,
            range: 'Sheet1',
          });
        }

        res.status(201).json({
          message: `the movie ${createdSheet?.properties?.title} was backed up successfully`,
          id: sheetId,
          url: createdSheet?.spreadsheetUrl,
        });
      } catch (error) {
        next(error);
      }
    } else {
      res.status(405).json({ message: 'cannot backup this film.' });
    }
  }
);

export { router as filmRoutes };
