import { drive_v3 } from 'googleapis';
import { auth, sheets } from '../../../config';
import { grantPermissionsGoogleDrive } from '../../index';

interface GoogleSheetCreationOptions {
  permissions?: drive_v3.Schema$PermissionList;
}

interface CreateSheetParams {
  sheetName: string | undefined;
  options: GoogleSheetCreationOptions;
}

const defaultOptions = {
  sheetName: undefined,
  options: {
    permissions: { kind: '', permissions: [], nextPageToken: '' },
  },
};

export const createSheet = async (
  params: CreateSheetParams = defaultOptions
) => {
  const { options, sheetName } = params;
  try {
    const newSheet = await sheets.spreadsheets.create({
      auth: auth,
      requestBody: {
        properties: {
          title: sheetName,
        },
      },
    });
    options.permissions?.permissions?.map(async (user) =>
      grantPermissionsGoogleDrive(newSheet.data.spreadsheetId, user)
    );

    return newSheet.data;
  } catch (err) {
    const error = new Error('Failed to create the spreadSheet');
    error.name = 'FAILED_CREATE_GOOGLE_SPREADSHEET_API';
    throw error;
  }
};
