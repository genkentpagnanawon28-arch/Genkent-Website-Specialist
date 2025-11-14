# Google Apps Script Setup Guide

Follow these steps to create a new Google Apps Script that will handle your contact form submissions and send emails to your Gmail.

## Step 1: Create a New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Name it something like "Contact Form Submissions"
4. **IMPORTANT**: Copy the Sheet ID from the URL
   - The URL looks like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - Copy the part between `/d/` and `/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`
   - Your Sheet ID is: `1a2b3c4d5e6f7g8h9i0j`

## Step 2: Create a New Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project" (or the "+" button)
3. You'll see a blank script editor

## Step 3: Copy the Code

1. Delete the default `function myFunction() {}` code
2. Copy and paste the entire code from `Code.gs` file into the editor
3. **IMPORTANT**: Update the `SPREADSHEET_ID` constant with your Sheet ID from Step 1
   - Find this line: `const SPREADSHEET_ID = '';`
   - Replace the empty string with your Sheet ID: `const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i0j';`
4. Verify `YOUR_EMAIL` is correct: `const YOUR_EMAIL = 'Genkentpagnanawon28@gmail.com';`

## Step 4: Save the Script

1. Click "Save" (or Ctrl+S / Cmd+S)
2. Name your project (e.g., "Contact Form Handler")
3. Click "OK"

## Step 5: Deploy as Web App

1. Click "Deploy" in the top right
2. Select "New deployment"
3. Click the gear icon (⚙️) next to "Select type"
4. Choose "Web app"
5. Configure the deployment:
   - **Description**: "Contact Form Handler v1" (optional)
   - **Execute as**: "Me" (your email)
   - **Who has access**: "Anyone" (IMPORTANT - this allows your website to use it)
6. Click "Deploy"
7. **COPY THE WEB APP URL** - You'll need this for your website!

## Step 6: Authorize Permissions

1. When you first deploy, Google will ask you to authorize the script
2. Click "Authorize access"
3. Select your Google account
4. Click "Advanced" → "Go to [Project Name] (unsafe)"
5. Click "Allow" to grant permissions:
   - Access to Google Sheets (to save form data)
   - Access to Gmail (to send email notifications)

## Step 7: Update Your Website

1. Open `script.js` in your project
2. Find this line:
   ```javascript
   const SCRIPT_URL = 'YOUR_OLD_SCRIPT_URL_HERE';
   ```
3. Replace it with your NEW Web App URL from Step 5
4. Save the file

## Step 8: Test the Form

1. Open your website
2. Fill out the contact form
3. Submit it
4. Check:
   - Your Google Sheet should have a new row with the submission
   - Your Gmail inbox should receive an email notification

## Troubleshooting

### If the form doesn't work:
1. **Check the Web App URL** - Make sure it's correct in `script.js`
2. **Check permissions** - Make sure "Who has access" is set to "Anyone"
3. **Check browser console** - Open Developer Tools (F12) and look for errors
4. **Verify Sheet ID** - Make sure the Sheet ID in Code.gs matches your spreadsheet

### If emails aren't sending:
1. Check your Gmail inbox (including spam folder)
2. Verify `YOUR_EMAIL` is correct in Code.gs
3. Check the Apps Script execution log:
   - In Apps Script editor, click "Executions" (clock icon) to see if there are errors

### If you get "Script function not found" error:
1. Make sure the function is named `doPost` (case-sensitive)
2. Make sure you saved the script before deploying
3. Try creating a new deployment

## Quick Reference

- **Google Sheets**: https://sheets.google.com
- **Google Apps Script**: https://script.google.com
- **Your Email**: Genkentpagnanawon28@gmail.com

## Code Structure

The script has two main functions:
- `doPost()` - Handles form submissions (saves to sheet + sends email)
- `doGet()` - Retrieves submissions for the admin panel

Both functions are already included in your Code.gs file.

