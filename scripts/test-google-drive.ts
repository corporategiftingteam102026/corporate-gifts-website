import dotenv from "dotenv";
import { google } from "googleapis";
import path from "path";

dotenv.config({
  path: ".env.local",
});

async function main() {
  console.log("\nConnecting to Google Drive...\n");

  const rootFolderId =
    process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

  if (!rootFolderId) {
    throw new Error(
      "GOOGLE_DRIVE_ROOT_FOLDER_ID is missing from .env.local"
    );
  }

  const credentialsPath = path.resolve(
    process.cwd(),
    ".secrets/google-service-account.json"
  );

  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: [
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });

  const drive = google.drive({
    version: "v3",
    auth,
  });

  console.log("✓ Google Drive authentication configured");

  /*
   * Check that the root folder itself is accessible.
   */
  const rootResponse =
    await drive.files.get({
      fileId: rootFolderId,
      fields: "id,name,mimeType",
      supportsAllDrives: true,
    });

  console.log(
    `✓ Root folder found: ${rootResponse.data.name}`
  );

  /*
   * Read immediate children of the root folder.
   */
  const response =
    await drive.files.list({
      q: `'${rootFolderId}' in parents and trashed = false`,
      fields:
        "files(id,name,mimeType)",
      orderBy: "name",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

  const files =
    response.data.files ?? [];

  console.log(
    "\nItems inside root folder:\n"
  );

  if (files.length === 0) {
    console.warn(
      "⚠ Root folder is accessible but contains no visible files/folders."
    );
  }

  for (const file of files) {
    const type =
      file.mimeType ===
      "application/vnd.google-apps.folder"
        ? "📁"
        : "📄";

    console.log(
      `${type} ${file.name} (${file.id})`
    );
  }

  console.log(
    "\n✓ Google Drive connection successful\n"
  );
}

main().catch((error) => {
  console.error(
    "\n❌ Google Drive connection failed\n"
  );

  console.error(error);

  process.exit(1);
});