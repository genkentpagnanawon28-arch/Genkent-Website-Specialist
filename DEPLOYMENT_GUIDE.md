# Step-by-Step Deployment Guide

Follow these steps carefully to fix the "Error loading" issue in admin.html:

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a **new spreadsheet**
3. Name it **"Contact Form Submissions"**
4. **IMPORTANT**: Don't delete the first row - it will be used for headers
5. The script will automatically add headers: Date, Name, Email, Message

## Step 2: Deploy Code.gs

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"+ New Project"**
3. Delete any default code
4. Copy the **entire contents** of `Code.gs` and paste it
5. **IMPORTANT**: In Code.gs, you have two options:

### Option A: Use Bound Spreadsheet (RECOMMENDED)
   - In Google Sheets, click **Extensions** → **Apps Script**
   - This creates a script bound to your spreadsheet
   - The script will automatically use this spreadsheet
   - Leave `SPREADSHEET_ID = '';` empty in Code.gs

### Option B: Use Spreadsheet ID
   - Get your Spreadsheet ID from the URL:
     ```
     https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
     ```
   - In Code.gs, line 8, replace `''` with your ID:
     ```javascript
     const SPREADSHEET_ID = 'your-actual-spreadsheet-id-here';
     ```

## Step 3: Save and Deploy

1. In Apps Script editor, click **Save** (Ctrl+S or Cmd+S)
2. Give your project a name: "Contact Form API"
3. Click **Deploy** → **New deployment**
4. Click the **gear icon** ⚙️ next to "Select type"
5. Choose **Web app**
6. Configure:
   - **Description**: "Contact Form API v1"
   - **Execute as**: **"Me"** (your email)
   - **Who has access**: **"Anyone"** ← CRITICAL!
7. Click **Deploy**
8. **Authorize** when prompted (allow access to Google Sheets)
9. **Copy the Web App URL** - you'll get something like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

## Step 4: Update Files

### Update script.js (Contact Form)
1. Open `script.js`
2. Find line ~112 where it says:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/...';
   ```
3. Replace with your **deployment URL** from Step 3

### Update admin.html (Admin Panel)
1. Open `admin.html`
2. Find line 329 where it says:
   ```javascript
   const GET_SCRIPT_URL = 'https://script.google.com/macros/s/...';
   ```
3. Replace with the **same deployment URL** from Step 3
4. **Change password** on line 303:
   ```javascript
   const ADMIN_PASSWORD = 'your-secure-password';
   ```

## Step 5: Test

### Test Contact Form:
1. Open your website (`index.html`)
2. Fill out and submit the contact form
3. Check your Google Sheet - you should see the data appear!

### Test Admin Panel:
1. Open `admin.html` in your browser
2. Enter your password
3. Click "Refresh" if needed
4. You should see all submissions!

## Common Issues & Fixes

### ❌ "Error loading submissions"
**Fix:**
- Verify the deployment URL is correct (no extra spaces)
- Ensure deployment is set to "Anyone" access
- Check that `doGet()` function exists in Code.gs
- Try redeploying with a new version

### ❌ "Failed to fetch" or Network Error
**Fix:**
- Check internet connection
- Verify the URL is accessible (try opening it in a new tab)
- Check browser console (F12) for CORS errors
- Make sure deployment access is set to "Anyone"

### ❌ Form submissions not saving
**Fix:**
- Check `SCRIPT_URL` in script.js is correct
- Verify spreadsheet is accessible
- Check Code.gs has `doPost()` function
- Try submitting again

### ❌ Empty data or wrong spreadsheet
**Fix:**
- If using Spreadsheet ID: Verify the ID is correct in Code.gs
- If using bound spreadsheet: Make sure script is opened from Extensions → Apps Script
- Check that headers row exists (Date, Name, Email, Message)

## Verification Checklist

Before troubleshooting, verify:
- ✅ Google Sheet created and accessible
- ✅ Code.gs deployed as Web App
- ✅ Deployment set to "Anyone" access
- ✅ Script URL updated in script.js
- ✅ GET Script URL updated in admin.html
- ✅ Password changed in admin.html
- ✅ Authorization granted when deploying

## Need More Help?

1. **Check Browser Console**: Press F12 → Console tab → Look for red errors
2. **Test the URL**: Open your deployment URL in a new tab - you should see JSON data
3. **Check Apps Script Logs**: In Apps Script editor → View → Execution transcript
4. **Verify Spreadsheet**: Make sure your spreadsheet is accessible and not deleted

---

**Note**: After making changes to Code.gs, you need to **redeploy** with a new version number for changes to take effect!

