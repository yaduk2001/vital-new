import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔑 Service Account JSON Extractor\n');
console.log('This script will extract the values you need from your service account JSON file.\n');

// Try to find JSON file in current directory
const jsonFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.json'));

if (jsonFiles.length === 0) {
  console.log('📁 No JSON files found in the backend directory.');
  console.log('💡 Please place your service account JSON file in the backend folder.\n');
  console.log('   The file should be named something like:');
  console.log('   - my-project-123456-abc123.json');
  console.log('   - service-account-key.json\n');
  process.exit(1);
}

if (jsonFiles.length === 1) {
  const jsonFile = jsonFiles[0];
  console.log(`✅ Found JSON file: ${jsonFile}\n`);
  extractValues(jsonFile);
} else {
  console.log('📁 Found multiple JSON files:');
  jsonFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
  });
  console.log('\n💡 Please rename your service account JSON file to be unique, or run:');
  console.log(`   node extract-service-account.js <filename.json>\n`);
  
  if (process.argv[2]) {
    extractValues(process.argv[2]);
  } else {
    process.exit(1);
  }
}

function extractValues(jsonFile) {
  try {
    const filePath = path.join(__dirname, jsonFile);
    const jsonContent = fs.readFileSync(filePath, 'utf8');
    const serviceAccount = JSON.parse(jsonContent);

    if (!serviceAccount.client_email || !serviceAccount.private_key) {
      console.error('❌ This doesn\'t look like a service account JSON file.');
      console.error('   It should have "client_email" and "private_key" fields.\n');
      process.exit(1);
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Add these to your backend/.env file:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log(`GOOGLE_SERVICE_ACCOUNT_EMAIL=${serviceAccount.client_email}`);
    console.log(`GOOGLE_PRIVATE_KEY="${serviceAccount.private_key.replace(/\n/g, '\\n')}"`);
    console.log(`GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here\n`);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 Next steps:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('1. Copy the values above to your backend/.env file');
    console.log('2. Replace "your-spreadsheet-id-here" with your actual Spreadsheet ID');
    console.log('3. Share your Google Sheet with this email:');
    console.log(`   ${serviceAccount.client_email}`);
    console.log('   (Give it "Editor" permissions)');
    console.log('4. Restart your server\n');
    
    console.log('✅ Done! Your service account is ready to use.\n');
    
  } catch (error) {
    console.error('❌ Error reading JSON file:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   - The file is a valid JSON file');
    console.error('   - It\'s a service account key from Google Cloud Console');
    console.error('   - The file is in the backend directory\n');
    process.exit(1);
  }
}

