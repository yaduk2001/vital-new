/**
 * Google Apps Script Web App Integration
 * This service sends contact form data to a Google Apps Script web app
 * which then writes the data to Google Sheets.
 * 
 * No API keys, Service Accounts, or OAuth2 needed!
 */

/**
 * Send contact form data to Google Apps Script web app
 * @param {Object} data - Contact form data
 * @param {string} data.name - User's name
 * @param {string} data.email - User's email
 * @param {string} data.message - User's message
 * @param {string} data.timestamp - ISO timestamp
 */
export const addToGoogleSheetViaAppsScript = async (data) => {
  try {
    const { name, email, message, timestamp } = data;

    // Get the Apps Script web app URL from environment variable
    const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!APPS_SCRIPT_URL) {
      console.warn('⚠️ Google Apps Script URL not configured. Skipping Google Sheets logging.');
      console.warn('💡 Set GOOGLE_APPS_SCRIPT_URL in your .env file');
      return;
    }

    // Prepare the data to send
    const payload = {
      name,
      email,
      message,
      timestamp,
    };

    // Send POST request to Apps Script web app
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Apps Script returned error: ${response.status} - ${errorText}`);
    }

    const result = await response.json().catch(() => ({ success: true }));
    
    if (result.success !== false) {
      console.log('✅ Data sent to Google Apps Script successfully');
      return result;
    } else {
      throw new Error(result.error || 'Unknown error from Apps Script');
    }
  } catch (error) {
    console.error('❌ Error sending to Google Apps Script:', error.message);
    // Re-throw the error so the calling code can handle it (e.g., send fallback email)
    throw error;
  }
};

