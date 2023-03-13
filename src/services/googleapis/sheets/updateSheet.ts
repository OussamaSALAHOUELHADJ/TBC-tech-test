import { sheets_v4 } from 'googleapis';
import { sheets } from '../../../config';

export interface GoogleSheetWriteOptions {
  spreadsheetId: string;
  range: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any[][];
}

export const updateSheet = async (
  options: GoogleSheetWriteOptions
): Promise<sheets_v4.Schema$UpdateValuesResponse> => {
  const requestBody: sheets_v4.Params$Resource$Spreadsheets$Values$Update = {
    spreadsheetId: options.spreadsheetId,
    range: options.range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: options.values,
    },
  };

  const response = await sheets.spreadsheets.values.update(requestBody);

  return response.data;
};
