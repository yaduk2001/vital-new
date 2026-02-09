/**
 * Generate personalized welcome message based on user authentication status
 * @param {Object} users - User object from AuthContext
 * @param {boolean} isMainChat - Whether this is for the main chat page (affects message tone)
 * @returns {Promise<string>} Welcome message
 */
export async function generateWelcomeMessage(users, isMainChat = false) {
  console.log('Generating welcome message for:', { users, isMainChat });
  
  if (users && (users.name || users.displayName)) {
    // User has name data
    const userName = users.name || users.displayName || 'Valued User';
    console.log('Using existing user name:', userName);

    if (isMainChat) {
      return `Welcome back, ${userName}! 🎉

I'm Supe AI, your intelligent assistant powered by cutting-edge artificial intelligence. I'm here to help you with anything you need - from answering questions and solving problems to creative tasks and productivity support.

🚀 Ready to boost your productivity and unlock new possibilities? Let's get started!

What would you like to work on today?`;
    } else {
      return `Hello ${userName}! 👋

I'm Supe AI's assistant, here to help you with our cutting-edge AI services. Whether you need information about our solutions, technical support, or want to explore how AI can transform your business, I'm here to assist you.

🚀 How can I help you today?`;
    }
  } else if (users && !users.name && !users.displayName) {
    // User is logged in but name data is missing, try to get it from backend
    console.log('User logged in but name missing, fetching user data...');
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.user && (data.user.name || data.user.displayName)) {
        const userName = data.user.name || data.user.displayName || 'Valued User';
        console.log('Retrieved user name:', userName);
        
        if (isMainChat) {
          return `Welcome back, ${userName}! 🎉

I'm Supe AI, your intelligent assistant powered by cutting-edge artificial intelligence. I'm here to help you with anything you need - from answering questions and solving problems to creative tasks and productivity support.

🚀 Ready to boost your productivity and unlock new possibilities? Let's get started!

What would you like to work on today?`;
        } else {
          return `Hello ${userName}! 👋

I'm Supe AI's assistant, here to help you with our cutting-edge AI services. Whether you need information about our solutions, technical support, or want to explore how AI can transform your business, I'm here to assist you.

🚀 How can I help you today?`;
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  // Fallback messages
  if (isMainChat) {
    return 'Hello! I\'m Supe AI, your intelligent assistant. How can I help you today?';
  } else {
    return "Hello! I'm Supe AI's assistant. How can I help you with our services today?";
  }
} 