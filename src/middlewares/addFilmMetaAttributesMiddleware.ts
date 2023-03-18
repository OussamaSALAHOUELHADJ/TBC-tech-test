import { OmdbFilm } from '../models';
import { Request, Response, NextFunction } from 'express';

type InputObject = {
  [key: string]: (film: OmdbFilm) => any;
};

export function addFilmMetaAttributesMiddleware(functionsObject: InputObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const filmList: OmdbFilm[] = res.locals.filmList;
    try {
      for (const key in functionsObject) {
        for (const film of filmList) {
          if (functionsObject.hasOwnProperty(key)) {
            const func = functionsObject[key];
            const value = func(film);
            film.meta[key] = value;
          }
        }
      }

      /* res.locals.filmList = filmList; */
      next();
    } catch (error) {
      next(error);
    }
  };
}
