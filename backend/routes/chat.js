import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini client
let genAI = null;
let model = null;

const initializeGemini = () => {
  if (process.env.GEMINI_API_KEY) {
    try {
      genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      // Using gemini-3-pro-preview (Google's most intelligent model)
      model = genAI.getGenerativeModel({
        model: "gemini-3-pro-preview",
        systemInstruction: {
          role: "system",
          parts: [{ text: "You are Supe AI's intelligent company assistant." }]
        }
      });
      console.log('✅ Gemini client initialized successfully with gemini-3-pro-preview');
      return true;
    } catch (error) {
      console.log('❌ Error initializing Gemini client:', error.message);
      return false;
    }
  } else {
    console.log('❌ GEMINI_API_KEY not found in environment variables');
    return false;
  }
};

// Try to initialize immediately
initializeGemini();

router.post('/', async (req, res) => {
  try {
    console.log('🤖 Chat request received');

    if (!genAI) {
      if (!initializeGemini()) {
        return res.status(503).json({
          error: 'Gemini service is not configured. Please check your environment variables.'
        });
      }
    }

    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string'
      });
    }

    // Calculate current time context
    const now = new Date();
    const hour = now.getHours();
    let timeGreeting = 'Good morning';
    if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon';
    if (hour >= 17) timeGreeting = 'Good evening';

    // Construct the full prompt with system instructions and context
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{
            text: `
          SYSTEM INSTRUCTIONS:
          You are Supe AI's intelligent company assistant.
          
          CONTEXT:
          - Current time greeting to use if applicable: "${timeGreeting}"
          - Your name: Supe AI Assistant
          
          INSTRUCTIONS:
          1. **Language Detection**: Detect the language of the user's message (English, Hindi, Tamil, Malayalam, etc.) and ALWAYS reply in the SAME language.
          
          2. **Greetings**: If the user says "Hi", "Hello", "Namaste", etc.:
             - Reply with a friendly greeting that includes the time-appropriate phrase ("${timeGreeting}") translated to their language.
             - Example (English): "Hello! ${timeGreeting}. Nice to meet you."
          
          3. **Pleasantries**: If the user asks "How are you?", "How is it going?":
             - Reply with a varied, friendly response in their language.
             - Example: "I'm doing great, thank you! How can I help you with Supe AI today?"
          
          4. **Topic Restriction (STRICT)**:
             - You are ONLY allowed to answer questions about **Supe AI**, our services, products, business operations, AI solutions, and how we help businesses.
             - If the user asks about ANYTHING else (general knowledge, coding help not related to Supe, personal questions, politics, etc.):
               - Politely refuse in the user's language.
               - Example: "I specialize in Supe AI services. Please ask me about our company or how we can help your business."
          
          5. **Tone**: Professional, helpful, and polite.
          ` }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am ready to assist as Supe AI's intelligent assistant, strictly following these instructions." }],
        },
      ],
    });

    console.log('🚀 Sending message to Gemini...');
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    console.log('✅ Gemini response generated successfully');

    res.json({
      reply: text,
      model: "gemini-3-pro-preview",
      usage: { total_tokens: 0 }
    });

  } catch (error) {
    console.error('❌ Chat API error:', error);

    // Handle rate limiting (429 errors)
    if (error.status === 429) {
      const retryAfter = error.errorDetails?.find(d => d['@type']?.includes('RetryInfo'))?.retryDelay || '60s';
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'The AI service has reached its quota limit. Please try again later.',
        retryAfter: retryAfter,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    // Handle authentication errors
    if (error.status === 401 || error.message?.includes('API key')) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid API key configuration.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    // Generic error handler
    res.status(500).json({
      error: 'Failed to process chat message',
      message: 'An unexpected error occurred. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;