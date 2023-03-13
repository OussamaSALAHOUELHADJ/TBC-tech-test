import { drive_v3 } from 'googleapis';
import { auth, drive } from '../../../config';

export const grantPermissionsGoogleDrive = async (
  fileId: string | null | undefined,
  params: drive_v3.Schema$Permission
): Promise<boolean> => {
  try {
    if (fileId) {
      await drive.permissions.create({
        fileId: fileId,
        auth: auth,
        requestBody: params,
        sendNotificationEmail: true,
        emailMessage: `Hello ${params.emailAddress} I am sharing this spreadsheet with you`,
      });
      return true;
    }
    return false;
  } catch (err) {
    const error = new Error('Failed to Grant Permissions');
    error.name = 'FAILED_GRANT_PERMISSION_GOOGLE_DRIVE_API';
    throw error;
  }
};
