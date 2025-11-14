// Configuration: Replace with your Google Sheet ID if using a specific spreadsheet
// To find your Sheet ID: Look at the URL - it's the long string between /d/ and /edit
// Example: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
// If left empty, it will use the active spreadsheet bound to the script
const SPREADSHEET_ID = '';

// Your Gmail address where contact form submissions will be sent
const YOUR_EMAIL = 'Genkentpagnanawon28@gmail.com';

// Function to get the spreadsheet
function getSpreadsheet() {
  if (SPREADSHEET_ID === '') {
    // Use bound spreadsheet (spreadsheet where the script is deployed)
    return SpreadsheetApp.getActiveSpreadsheet();
  } else {
    // Use specific spreadsheet by ID
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
}

// Function to handle POST requests (form submissions)
function doPost(e) {
  try {
    // Parse the incoming data
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // Fallback for form data
      data = {
        name: e.parameter.name || '',
        email: e.parameter.email || '',
        message: e.parameter.message || ''
      };
    } else {
      throw new Error('No data received');
    }

    // Get the spreadsheet and active sheet
    const spreadsheet = getSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    
    // Initialize headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date', 'Name', 'Email', 'Message']);
    }
    
    // Append the new submission
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.message || ''
    ]);
    
    // Send email notification to your Gmail
    try {
      const subject = 'New Contact Form Submission from ' + (data.name || 'Website Visitor');
      const emailBody = 
        'You have received a new message from your website contact form.\n\n' +
        'Name: ' + (data.name || 'Not provided') + '\n' +
        'Email: ' + (data.email || 'Not provided') + '\n' +
        'Message:\n' + (data.message || 'No message provided') + '\n\n' +
        '---\n' +
        'This message was sent from your portfolio website contact form.';
      
      // Send email using GmailApp
      GmailApp.sendEmail(
        YOUR_EMAIL,
        subject,
        emailBody,
        {
          replyTo: data.email || YOUR_EMAIL,
          name: data.name || 'Website Contact Form'
        }
      );
    } catch (emailError) {
      // Log email error but don't fail the request
      // The data is still saved to the sheet
      console.error('Email sending failed:', emailError.toString());
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'success',
      'message': 'Submission saved successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'message': error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to handle GET requests (retrieve submissions)
function doGet(e) {
  try {
    // Check for JSONP callback parameter
    const callback = e.parameter.callback;
    
    // Get the spreadsheet and active sheet
    const spreadsheet = getSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    // Prepare response data
    let responseData;
    
    // If no data (only header or empty), return empty array
    if (lastRow <= 1) {
      responseData = { 
        'result': 'success', 
        'submissions': [] 
      };
      
      // Handle JSONP callback if provided
      if (callback) {
        return ContentService.createTextOutput(
          callback + '(' + JSON.stringify(responseData) + ');'
        )
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
      }
      
      // Return regular JSON response
      return ContentService.createTextOutput(JSON.stringify(responseData))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get all data starting from row 2 (skip header row)
    // Format: getRange(startRow, startCol, numRows, numCols)
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 4);
    const values = dataRange.getValues();
    
    // Convert to array of objects with proper date formatting
    const submissions = values.map(function(row) {
      // Format date properly - Google Sheets returns dates as Date objects
      let dateValue = row[0];
      
      // Handle different date formats from Google Sheets
      if (dateValue instanceof Date) {
        // Date object from Google Sheets
        dateValue = dateValue.toISOString();
      } else if (dateValue && typeof dateValue === 'object' && dateValue.getTime) {
        // Another date-like object
        dateValue = new Date(dateValue).toISOString();
      } else if (typeof dateValue === 'string' && dateValue.length > 0) {
        // Already a string, try to parse it
        try {
          const parsedDate = new Date(dateValue);
          if (!isNaN(parsedDate.getTime())) {
            dateValue = parsedDate.toISOString();
          }
        } catch (e) {
          // Keep original string if parsing fails
        }
      } else {
        // Fallback to current date
        dateValue = new Date().toISOString();
      }
      
      return {
        date: dateValue,
        name: (row[1] && String(row[1]).trim()) || 'N/A',
        email: (row[2] && String(row[2]).trim()) || 'N/A',
        message: (row[3] && String(row[3]).trim()) || 'N/A'
      };
    });
    
    // Reverse to show newest first (create new array to avoid mutating original)
    const reversedSubmissions = submissions.slice().reverse();
    
    // Prepare response data
    responseData = { 
      'result': 'success', 
      'submissions': reversedSubmissions 
    };
    
    // Handle JSONP callback if provided (for CORS workaround)
    if (callback) {
      return ContentService.createTextOutput(
        callback + '(' + JSON.stringify(responseData) + ');'
      )
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // Return regular JSON response with CORS headers
    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response with details
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'message': error.toString(),
      'errorDetails': error.stack || 'No additional details'
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}
