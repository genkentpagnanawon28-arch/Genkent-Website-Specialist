# Contact Form Database Setup Guide

This guide will help you set up the database system so that contact form submissions are saved and can be viewed in the admin panel.

## Quick Setup Overview

1. **Contact Form** → Saves data to Google Sheets via Google Apps Script
2. **Admin Panel** (`admin.html`) → Views all submissions with password protection

## Step 1: Set Up Google Sheets Database

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Contact Form Submissions"
3. Copy the **Spreadsheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
   - The ID is the long string between `/d/` and `/edit`
4. Open `Code.gs` and replace:
   ```javascript
   SpreadsheetApp.getActiveSpreadsheet()
   ```
   with:
   ```javascript
   SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE')
   ```
   (Replace `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID)

## Step 2: Deploy Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Delete the default code and paste the entire contents of `Code.gs`
4. Save the project (Ctrl+S or Cmd+S)
5. Name it "Contact Form API"

### Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "Contact Form API"
   - **Execute as**: "Me"
   - **Who has access**: **"Anyone"** (Important!)
5. Click **Deploy**
6. **Copy the Web App URL** - you'll need this for both files

## Step 3: Update script.js (Contact Form)

1. Open `script.js`
2. Find line 110 (approximately) where it says:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/...';
   ```
3. Replace the URL with your **POST deployment URL** from Step 2

## Step 4: Update admin.html (Admin Panel)

1. Open `admin.html`
2. Find line 329 where it says:
   ```javascript
   const GET_SCRIPT_URL = 'YOUR_GET_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GET_SCRIPT_URL_HERE` with your **GET deployment URL** (same URL from Step 2)
4. **Change the password** on line 303:
   ```javascript
   const ADMIN_PASSWORD = 'admin123'; // Change to your secure password
   ```

## Step 5: Test the System

### Test Contact Form:
1. Open your website (`index.html`)
2. Fill out the contact form
3. Submit it
4. Check your Google Sheet - you should see the submission appear!

### Test Admin Panel:
1. Open `admin.html` in your browser
2. Enter your password
3. You should see all submissions in a table
4. Click "Refresh" to reload data

## Security Recommendations

1. **Change the admin password** - Use a strong, unique password
2. **Keep URLs private** - Don't share your Google Apps Script URLs publicly
3. **Optional: IP Restrictions** - In Google Apps Script, you can restrict access by IP address
4. **Host admin.html privately** - Only you should have access to this file

## Features Available

✅ **Contact Form** saves submissions to Google Sheets  
✅ **Admin Panel** with password protection  
✅ **Statistics Dashboard** showing:
   - Total submissions
   - Submissions today
   - Submissions this week
✅ **Clickable email links** to reply to clients  
✅ **Auto-refresh** button to reload data  
✅ **Responsive design** for mobile devices  

## Troubleshooting

### Form submissions not saving?
- Verify the POST URL in `script.js` is correct
- Check that the Spreadsheet ID in `Code.gs` is correct
- Ensure the web app deployment has "Anyone" access
- Check browser console for errors (F12)

### Admin panel not loading data?
- Verify the GET URL in `admin.html` is correct
- Make sure `doGet()` function is deployed (it's in Code.gs)
- Check that the web app allows "Anyone" access
- Try refreshing the page or clicking the Refresh button

### Getting CORS errors?
- Make sure the deployment is set to "Anyone" access
- Check that both `doPost` and `doGet` functions have CORS headers (they do in Code.gs)

## File Structure

```
genkentporfolio-main/
├── index.html          # Main website with contact form
├── admin.html          # Admin panel (password protected)
├── script.js           # Handles form submission (POST)
├── Code.gs             # Google Apps Script (database backend)
└── README_ADMIN_SETUP.md  # This file
```

## Need Help?

If you encounter any issues:
1. Check the browser console (F12) for error messages
2. Verify all URLs are correctly copied (no extra spaces)
3. Make sure Google Sheets has headers: Date, Name, Email, Message
4. Ensure the web app is deployed and accessible

---

**Note**: The Google Sheets acts as your database. All submissions are automatically saved with a timestamp, making it easy to track and manage client inquiries.

