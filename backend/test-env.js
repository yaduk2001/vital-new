import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Testing Environment Variables Loading...');
console.log('Current directory:', __dirname);
console.log('Looking for .env file in:', path.join(__dirname, '.env'));

// Load environment variables
dotenv.config();

console.log('\n📋 Environment Variables Check:');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? `✅ Set (${process.env.OPENAI_API_KEY.substring(0, 20)}...)` : '❌ Missing');
console.log('PORT:', process.env.PORT || '5000 (default)');

// Test OpenAI client creation
if (process.env.OPENAI_API_KEY) {
  try {
    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('✅ OpenAI client created successfully');
  } catch (error) {
    console.log('❌ Error creating OpenAI client:', error.message);
  }
} else {
  console.log('❌ Cannot test OpenAI client - API key missing');
} 