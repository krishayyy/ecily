/**
 * Ecily form webhook — Google Apps Script
 * Receives waitlist + chapter submissions and appends them to a sheet.
 *
 * SETUP (one time, ~3 minutes):
 *  1. Create a Google Sheet (sheets.new). This is where data lands.
 *  2. Extensions → Apps Script. Delete the sample code.
 *  3. Paste THIS whole file in. Save.
 *  4. Deploy → New deployment → type "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Click Deploy, authorize when prompted, and COPY the Web app URL
 *     (it ends in /exec).
 *  5. In Vercel → your project → Settings → Environment Variables, add:
 *       SHEET_WEBHOOK_URL = <the /exec URL you copied>
 *     Redeploy. Done — every signup now appears as a row.
 *
 * To change the sheet structure later, edit HEADERS below and re-deploy.
 */

var SHEET_NAME = "Submissions"
var HEADERS = ["Timestamp", "Type", "Name", "Email", "School", "State"]

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents)
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = ss.getSheetByName(SHEET_NAME)

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME)
      sheet.appendRow(HEADERS)
    }

    sheet.appendRow([
      new Date(),
      data.type || "",
      data.name || "",
      data.email || "",
      data.school || "",
      data.state || "",
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// Lets you open the /exec URL in a browser to confirm it's live.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: "Ecily webhook is live." }))
    .setMimeType(ContentService.MimeType.JSON)
}
