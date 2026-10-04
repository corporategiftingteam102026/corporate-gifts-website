// // import {google} from "googleapis"; import path from "path";
// // function client(){const auth=new google.auth.GoogleAuth({keyFile:path.resolve(process.cwd(),process.env.GOOGLE_APPLICATION_CREDENTIALS||".secrets/google-service-account.json"),scopes:["https://www.googleapis.com/auth/spreadsheets.readonly"]});return google.sheets({version:"v4",auth});}
// // async function read(range:string){const spreadsheetId=process.env.GOOGLE_SPREADSHEET_ID;if(!spreadsheetId)throw new Error("GOOGLE_SPREADSHEET_ID is missing from .env.local");const r=await client().spreadsheets.values.get({spreadsheetId,range,valueRenderOption:"UNFORMATTED_VALUE"});const rows=r.data.values??[];console.log(`  ${range}: ${Math.max(rows.length-1,0)} data row(s)`);return rows;}
// // export const readCategories=()=>read("Categories!A:D"); export const readProducts=()=>read("Products!A:J"); export const readVariants=()=>read("Variants!A:F"); export const readWebsiteSettings=()=>read("Website Settings!A:B");
















// import { google } from "googleapis";
// import path from "path";

// function client() {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: path.resolve(
//       process.cwd(),
//       process.env.GOOGLE_APPLICATION_CREDENTIALS ||
//         ".secrets/google-service-account.json"
//     ),
//     scopes: [
//       "https://www.googleapis.com/auth/spreadsheets.readonly",
//     ],
//   });

//   return google.sheets({
//     version: "v4",
//     auth,
//   });
// }

// async function read(range: string) {
//   const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

//   if (!spreadsheetId) {
//     throw new Error(
//       "GOOGLE_SPREADSHEET_ID is missing from .env.local"
//     );
//   }

//   const response = await client().spreadsheets.values.get({
//     spreadsheetId,
//     range,
//     valueRenderOption: "UNFORMATTED_VALUE",
//   });

//   const rows = response.data.values ?? [];

//   console.log(
//     `  ${range}: ${Math.max(rows.length - 1, 0)} data row(s)`
//   );

//   return rows;
// }

// export const readCategories = () =>
//   read("Categories!A:D");

// export const readProducts = () =>
//   read("Products!A:J");

// export const readVariants = () =>
//   read("Variants!A:F");

// export const readFAQs = () =>
//   read("FAQs!A:D");

// export const readAbout = () =>
//   read("About!A:C");

// export const readWebsiteSettings = () =>
//   read("Website Settings!A:B");










import { google } from "googleapis";
import path from "path";

function client() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(
      process.cwd(),
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
        ".secrets/google-service-account.json"
    ),
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets.readonly",
    ],
  });

  return google.sheets({
    version: "v4",
    auth,
  });
}

async function read(range: string) {
  const spreadsheetId =
    process.env.GOOGLE_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error(
      "GOOGLE_SPREADSHEET_ID is missing from .env.local"
    );
  }

  const response =
    await client().spreadsheets.values.get({
      spreadsheetId,
      range,
      valueRenderOption: "UNFORMATTED_VALUE",
    });

  const rows = response.data.values ?? [];

  console.log(
    `  ${range}: ${Math.max(
      rows.length - 1,
      0
    )} data row(s)`
  );

  return rows;
}

export const readCategories = () =>
  read("Categories!A:D");

export const readProducts = () =>
  read("Products!A:J");

export const readVariants = () =>
  read("Variants!A:F");

export const readFAQs = () =>
  read("FAQs!A:D");

export const readAbout = () =>
  read("About!A:C");

export const readWebsiteSettings = () =>
  read("Website Settings!A:B");