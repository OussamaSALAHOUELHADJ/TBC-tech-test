import { google } from 'googleapis';
import { dotenv } from '../config/dotenv';

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets',
];

const client = new google.auth.JWT(
  dotenv.GOOGLE_API_EMAIL,
  undefined,
  dotenv.GOOGLE_API_PRIVATE_KEY,
  SCOPES
);

const sheets = google.sheets({
  version: 'v4',
  auth: client,
});

const drive = google.drive({
  version: 'v3',
  auth: client,
});

export { drive, sheets, client as auth };
