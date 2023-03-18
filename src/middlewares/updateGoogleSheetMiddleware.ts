import { Request, Response, NextFunction } from 'express';
import { updateSheet, createSheetIfNotExist } from '../services';
import UserToGrantPermissions from '../databases/googleDriveAccessUserList.json';
import { jsonTo2DimArray } from '../utils';

export async function updateGoogleSheetMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
        const filmList = res.locals.filmList;

        const transformedData = jsonTo2DimArray(filmList);
        await updateSheet({
          spreadsheetId: sheetId,
          values: transformedData,
          range: 'Sheet1',
        });
      }
      res.locals.sharedSheet = createdSheet;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    const error = new Error();
    error.name = 'ERROR_FILM_NOT_FOUND';
    next(error);
  }
}
