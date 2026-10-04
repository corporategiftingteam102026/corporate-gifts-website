import dotenv from "dotenv";
import { google } from "googleapis";
import path from "path";

dotenv.config({
  path: ".env.local",
});

async function main() {
  console.log("Connecting to Google...\n");

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error(
      "GOOGLE_SPREADSHEET_ID is missing from .env.local"
    );
  }

  const credentialsPath = path.resolve(
    process.cwd(),
    ".secrets/google-service-account.json"
  );

  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets.readonly",
    ],
  });

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  console.log("✓ Google authentication configured");

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Categories!A:D",
  });

  console.log("✓ Spreadsheet connected\n");

  const rows = response.data.values ?? [];

  console.log("Categories sheet:");
  console.table(rows);

  console.log("\n✓ Google Sheets connection successful");
}

main().catch((error) => {
  console.error("\n❌ Google Sheets connection failed");
  console.error(error);
  process.exit(1);
});