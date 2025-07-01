import path from "path";
import process from "process";
import { google } from "googleapis";
import * as dotenv from "dotenv";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const CREDENTIALS_PATH = path.resolve(
  process.env.GOOGLE_SERVICE_ACCOUNT_KEY || ""
);

const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: SCOPES,
});

export async function getSheetData(sheetName: string): Promise<string[][]> {
  const sheets = google.sheets({ version: "v4", auth });
  const spreadSheetId = process.env.GOOGLE_SHEET_ID!;
  const range = `${sheetName}!A:Z`;

  if (!spreadSheetId) {
    throw new Error(`No spreadSheetId`);
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadSheetId,
    range,
  });

  const rows = response.data.values;
  if (!rows || rows.length === 0) {
    throw new Error(`No data found in sheet: ${sheetName}`);
  }

  return rows;
}
