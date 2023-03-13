import { drive_v3, sheets_v4 } from 'googleapis';
import { createSheet, getSheet } from '../../../services';

interface GoogleSheetCreationOptions {
  permissions?: drive_v3.Schema$PermissionList;
}

interface CreateSheetIfNotExistParams {
  sheetName: string | undefined;
  options: GoogleSheetCreationOptions;
}

const defaultOptions = {
  sheetName: undefined,
  options: {
    permissions: { kind: '', permissions: [], nextPageToken: '' },
  },
};

export const createSheetIfNotExist = async (
  params: CreateSheetIfNotExistParams = defaultOptions
): Promise<sheets_v4.Schema$Spreadsheet | undefined> => {
  const { sheetName, options } = params;
  try {
    // check if sheet exists.
    const sheetExists = await getSheet({ title: sheetName });
    if (sheetExists) return sheetExists;

    //if there's no sheet, create one.
    const createdSheet = await createSheet({ sheetName, options });

    return createdSheet;
  } catch (error) {
    throw error;
  }
};
