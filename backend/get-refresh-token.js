import { google } from 'googleapis';
import readline from 'readline';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Get credentials from environment or prompt
const getCredentials = () => {
  return new Promise((resolve) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (clientId && clientSecret) {
      console.log('✅ Found credentials in .env file');
      resolve({ clientId, clientSecret });
      return;
    }

    console.log('📝 Please enter your OAuth2 credentials:');
    rl.question('Client ID: ', (id) => {
      rl.question('Client Secret: ', (secret) => {
        resolve({ clientId: id, clientSecret: secret });
      });
    });
  });
};

const main = async () => {
  try {
    const { clientId, clientSecret } = await getCredentials();

    if (!clientId || !clientSecret) {
      console.error('❌ Client ID and Client Secret are required');
      process.exit(1);
    }

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'http://localhost:3000'
    );

    const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // Force consent to get refresh token
      scope: scopes,
    });

    console.log('\n🌐 Please visit this URL to authorize the application:');
    console.log('\n' + authUrl + '\n');
    console.log('After authorizing, you will be redirected to a page with an error.');
    console.log('That\'s normal! Copy the "code" parameter from the URL.\n');
    console.log('Example URL: http://localhost:3000/?code=4/0Aean...');
    console.log('You need the part after "code="\n');

    rl.question('Enter the authorization code from the URL: ', async (code) => {
      try {
        const { tokens } = await oauth2Client.getToken(code);
        
        console.log('\n✅ Success! Here are your tokens:\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('REFRESH TOKEN (add this to your .env file):');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(tokens.refresh_token || '⚠️ No refresh token found. Make sure you selected "offline" access.');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        if (tokens.refresh_token) {
          console.log('📋 Add this to your backend/.env file:');
          console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
        } else {
          console.log('⚠️  No refresh token was provided. This might happen if:');
          console.log('   1. You already authorized this app before');
          console.log('   2. The OAuth consent screen is not properly configured');
          console.log('\n💡 Solution: Revoke access and try again, or use OAuth2 Playground method.\n');
        }

        rl.close();
        process.exit(0);
      } catch (error) {
        console.error('\n❌ Error getting token:', error.message);
        if (error.message.includes('invalid_grant')) {
          console.error('\n💡 This usually means the authorization code expired or was already used.');
          console.error('   Try getting a new authorization code by visiting the URL again.\n');
        }
        rl.close();
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
};

main();

