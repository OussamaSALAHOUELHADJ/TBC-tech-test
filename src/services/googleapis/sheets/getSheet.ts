import { sheets_v4 } from 'googleapis';
import { drive } from '../../../config';

interface GetSheetOptions {
  title?: string;
  id?: string;
}

export const getSheet = async (
  options: GetSheetOptions = { id: undefined, title: undefined }
): Promise<sheets_v4.Schema$Spreadsheet | undefined> => {
  try {
    const { data } = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      fields: 'nextPageToken, files(id, name,webViewLink)',
    });

    const sheetExists = data.files?.find(
      (f) => options.id === f.id || options.title === f.name
    );

    const sheet: sheets_v4.Schema$Spreadsheet | undefined = sheetExists
      ? {
          spreadsheetId: sheetExists.id,
          spreadsheetUrl: sheetExists.webViewLink,
          properties: { title: sheetExists.name },
        }
      : undefined;
    return sheet;
  } catch (error) {
    throw error;
  }
};
