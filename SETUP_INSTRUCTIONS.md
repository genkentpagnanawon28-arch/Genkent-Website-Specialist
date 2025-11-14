# Admin Dashboard Setup Instructions

## Step 1: Deploy Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy the entire contents of `Code.gs` into the script editor
4. Create a Google Sheet to store the submissions:
   - Go to Google Sheets
   - Create a new spreadsheet
   - Name it "Contact Form Submissions"
   - Copy the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
5. In the Apps Script editor:
   - Replace `SpreadsheetApp.getActiveSpreadsheet()` with:
     ```javascript
     SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE')
     ```
   - Replace `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID

## Step 2: Deploy as Web App

1. In Apps Script editor, click "Deploy" > "New deployment"
2. Click the gear icon next to "Select type" and choose "Web app"
3. Set:
   - Description: "Contact Form API"
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Copy the Web App URL

## Step 3: Update Your Files

### Update script.js
Replace the existing URL in `script.js` (around line 110) with your POST deployment URL:
```javascript
const response = await fetch('YOUR_POST_DEPLOYMENT_URL/exec', {
```

### Update admin.html
1. Open `admin.html`
2. Find this line: `const GET_SCRIPT_URL = 'YOUR_GET_SCRIPT_URL_HERE';`
3. Replace `YOUR_GET_SCRIPT_URL_HERE` with your GET deployment URL (the same URL but access via GET)
4. Change the password on this line: `const ADMIN_PASSWORD = 'admin123';` to something secure

## Step 4: Access the Admin Dashboard

1. Open `admin.html` in your browser
2. Enter the password you set
3. You'll see all form submissions with:
   - Date and time
   - Name
   - Email (clickable)
   - Message

## Security Notes

- **Change the default password** in `admin.html` (line with `ADMIN_PASSWORD`)
- Keep your Google Apps Script deployment URLs private
- Consider adding IP restrictions in Google Apps Script for extra security
- The admin page can be hosted anywhere or accessed locally

## Features

- ✅ Password-protected admin access
- ✅ View all submissions in a table
- ✅ Statistics (Total, Today, This Week)
- ✅ Click email addresses to send emails
- ✅ Auto-refresh functionality
- ✅ Responsive design for mobile devices
- ✅ Clean, modern interface

## Troubleshooting

**If submissions aren't showing:**
- Check that your Google Sheet has headers: Date, Name, Email, Message
- Verify the Spreadsheet ID is correct in Code.gs
- Check the browser console for errors

**If the admin page doesn't load data:**
- Verify the GET_SCRIPT_URL is correct
- Check that doGet function is deployed
- Ensure the deployment has "Anyone" access set

