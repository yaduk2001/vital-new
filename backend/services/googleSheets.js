import { google } from 'googleapis';

// Initialize Google Sheets API
const getSheetsClient = () => {
  // Option 1: Service Account (Recommended for server-side - works with private sheets)
  if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  }

  // Option 2: OAuth2 with Refresh Token (for private sheets)
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    return google.sheets({ version: 'v4', auth: oauth2Client });
  }

  // Option 3: API Key only (works for public sheets or read-only)
  // Note: API keys alone cannot write to private sheets - OAuth2 or Service Account is required
  if (process.env.GOOGLE_API_KEY) {
    console.warn('⚠️ Using API key only. This will NOT work for private sheets. Use Service Account or OAuth2 for write access.');
    return google.sheets({ 
      version: 'v4', 
      auth: process.env.GOOGLE_API_KEY,
    });
  }

  throw new Error('Google Sheets authentication not configured. Please set either:\n' +
    '1. GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY (recommended), or\n' +
    '2. GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN, or\n' +
    '3. GOOGLE_API_KEY (only works for public sheets)');
};

/**
 * Add a contact form submission to Google Sheets
 * @param {Object} data - Contact form data
 * @param {string} data.name - User's name
 * @param {string} data.email - User's email
 * @param {string} data.message - User's message
 * @param {string} data.timestamp - ISO timestamp
 */
export const addToGoogleSheet = async (data) => {
  try {
    const { name, email, message, timestamp } = data;

    if (!process.env.GOOGLE_SPREADSHEET_ID) {
      console.warn('⚠️ Google Spreadsheet ID not configured. Skipping Google Sheets logging.');
      return;
    }

    // Check if any authentication method is configured
    const hasServiceAccount = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY;
    const hasOAuth2 = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN;
    const hasApiKey = process.env.GOOGLE_API_KEY;

    if (!hasServiceAccount && !hasOAuth2 && !hasApiKey) {
      console.warn('⚠️ Google Sheets authentication not configured. Skipping Google Sheets logging.');
      console.warn('💡 Configure one of: Service Account, OAuth2, or API Key (API key only works for public sheets)');
      return;
    }

    const sheets = getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const range = 'Sheet1!A:D'; // Adjust range based on your sheet structure

    // Check if headers exist, if not, add them
    try {
      const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A1:D1',
      });

      const headers = headerResponse.data.values?.[0];
      
      if (!headers || headers.length === 0) {
        // Add headers
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'Sheet1!A1:D1',
          valueInputOption: 'RAW',
          resource: {
            values: [['Name', 'Email', 'Message', 'Timestamp']],
          },
        });
        console.log('✅ Headers added to Google Sheet');
      }
    } catch (headerError) {
      console.error('Error checking/adding headers:', headerError);
      // If it's an authentication error, provide helpful message
      if (headerError.code === 401 || (headerError.message && headerError.message.includes('Login Required'))) {
        console.error('❌ Authentication failed: Login Required');
        console.error('💡 API keys cannot write to private Google Sheets.');
        console.error('💡 Solutions:');
        console.error('   1. Use a Service Account (recommended - see GOOGLE_SHEETS_SETUP.md)');
        console.error('   2. Set up OAuth2 with refresh token (see GOOGLE_SHEETS_API_KEY_SETUP.md)');
        console.error('   3. Make the sheet publicly editable (NOT recommended for security)');
        throw headerError; // Re-throw to prevent continuing with invalid auth
      }
      if (headerError.message && headerError.message.includes('permission')) {
        console.warn('⚠️ Permission denied. Ensure the sheet is shared with the service account or OAuth2 account.');
      }
      // Don't throw for other errors - continue to try appending data
    }

    // Add the data row
    const values = [[name, email, message, timestamp]];

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:D',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values,
        },
      });

      console.log('✅ Data added to Google Sheet successfully');
    } catch (appendError) {
      // Provide helpful error message
      if (appendError.code === 401 || (appendError.message && appendError.message.includes('Login Required'))) {
        console.error('❌ Authentication failed: Login Required');
        console.error('💡 API keys cannot write to private Google Sheets.');
        console.error('💡 Solutions:');
        console.error('   1. Use a Service Account (recommended - see GOOGLE_SHEETS_SETUP.md)');
        console.error('   2. Set up OAuth2 with refresh token (see GOOGLE_SHEETS_API_KEY_SETUP.md)');
        console.error('   3. Make the sheet publicly editable (NOT recommended for security)');
        throw new Error('Cannot write to Google Sheet: Authentication required. Use Service Account or OAuth2 for private sheets.');
      }
      if (appendError.message && appendError.message.includes('permission')) {
        console.error('❌ Permission denied: Ensure the sheet is shared with the service account or OAuth2 account.');
        console.error('💡 Share the sheet with:');
        if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
          console.error(`   Service Account: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
        } else {
          console.error('   The email address used to generate the OAuth2 refresh token');
        }
        throw new Error('Cannot write to Google Sheet: Permission denied. Share the sheet with the authenticated account.');
      }
      throw appendError;
    }
  } catch (error) {
    console.error('❌ Error adding to Google Sheet:', error.message);
    // Re-throw the error so the calling code can handle it (e.g., send fallback email)
    throw error;
  }
};

