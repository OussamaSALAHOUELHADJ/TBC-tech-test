import { NextFunction, Request, Response } from 'express';
import { getCommonElements, uniqueArray } from '../utils';
import { FilmController } from './../controllers';
import { OmdbFilm } from './../models';
import { addFilmMetaAttributesMiddleware } from '../middlewares';

export async function requestedMetaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  async function compareWithFilm(filmToCompare: string, type?: string) {
    try {
      const flmCtrl = new FilmController();
      const otherFilmList: OmdbFilm[] = await flmCtrl.searchFilmList(
        filmToCompare,
        type
      );
      return (film: OmdbFilm) => {
        const commonActors: string[] = [];
        for (const key in otherFilmList) {
          film.compareToFilm(otherFilmList[key], {
            Actors: (a, b) => {
              if (a && b && a !== 'N/A' && b !== 'N/A') {
                commonActors.push(
                  ...getCommonElements(a.split(', '), b.split(', '))
                );
              }
            },
          });
        }
        return uniqueArray(commonActors).join(', ');
      };
    } catch (error) {
      throw error;
    }
  }
  const filmMeta = addFilmMetaAttributesMiddleware({
    isProducedBefore2015: (film) => parseInt(film.Year ?? '') < 2015,
    isPaulWalkerInTheFilm: (film) => film.includesActor('Paul Walker'),
    commonActorsWithStartWars: await compareWithFilm('starwars', 'series'),
  });

  return filmMeta(req, res, next);
}
