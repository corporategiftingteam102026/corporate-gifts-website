/*
  GOOGLE APPS SCRIPT - ENQUIRY ENDPOINT
  =====================================

  Recommended setup:
  - Bind this Apps Script project to the SAME Google Spreadsheet that contains
    the "Enquiries" and "Website Settings" tabs.
  - Deploy as Web App:
      Execute as: Me
      Who has access: Anyone
  - Copy the /exec deployment URL into:
      NEXT_PUBLIC_ENQUIRY_ENDPOINT

  The frontend sends JSON as text/plain so a simple browser POST can reach the
  Apps Script web app without exposing Google credentials.

  Expected Enquiries columns:
    Date | Name | Company | Email | Phone | Product | Variant |
    Quantity | Message | Status

  Website Settings should contain:
    Key | Value

  including:
    Enquiry Notification Email
*/

const ENQUIRIES_SHEET = "Enquiries";
const SETTINGS_SHEET = "Website Settings";

function doPost(e) {
  try {
    const payload = JSON.parse((e.postData && e.postData.contents) || "{}");

    const name = clean_(payload.name);
    const company = clean_(payload.company);
    const email = clean_(payload.email);
    const phone = clean_(payload.phone);
    const product = clean_(payload.product);
    const variant = clean_(payload.variant);
    const quantity = clean_(payload.quantity);
    const message = clean_(payload.message);

    if (!name) {
      return json_({ ok: false, message: "Name is required." });
    }

    if (!email && !phone) {
      return json_({
        ok: false,
        message: "Email or phone number is required."
      });
    }

    if (email && !isValidEmail_(email)) {
      return json_({ ok: false, message: "Invalid email address." });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const enquiriesSheet = ss.getSheetByName(ENQUIRIES_SHEET);

    if (!enquiriesSheet) {
      throw new Error('Missing sheet: "' + ENQUIRIES_SHEET + '"');
    }

    enquiriesSheet.appendRow([
      new Date(),
      name,
      company,
      email,
      phone,
      product,
      variant,
      quantity,
      message,
      "New"
    ]);

    const notificationEmail = getSetting_(
      ss,
      "Enquiry Notification Email"
    );

    if (notificationEmail) {
      const subject = product
        ? "New website enquiry: " + product
        : "New website enquiry";

      const body = [
        "A new enquiry was submitted from the website.",
        "",
        "Name: " + name,
        "Organisation: " + (company || "-"),
        "Email: " + (email || "-"),
        "Phone: " + (phone || "-"),
        "Product: " + (product || "-"),
        "Variant: " + (variant || "-"),
        "Quantity: " + (quantity || "-"),
        "",
        "Message:",
        message || "-",
        "",
        "Status: New"
      ].join("\n");

      MailApp.sendEmail({
        to: notificationEmail,
        subject: subject,
        body: body,
        replyTo: email || undefined
      });
    }

    return json_({
      ok: true,
      message: "Enquiry received successfully."
    });
  } catch (error) {
    console.error(error);

    return json_({
      ok: false,
      message: "Unable to process enquiry."
    });
  }
}

function getSetting_(ss, key) {
  const sheet = ss.getSheetByName(SETTINGS_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return "";

  const values = sheet
    .getRange(2, 1, sheet.getLastRow() - 1, 2)
    .getDisplayValues();

  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0]).trim() === key) {
      return String(values[i][1]).trim();
    }
  }

  return "";
}

function clean_(value) {
  return String(value == null ? "" : value).trim().slice(0, 5000);
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}


