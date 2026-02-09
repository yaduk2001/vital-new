import firebaseApp from './config/firebase.js';
import { getDatabase } from 'firebase-admin/database';

const db = getDatabase(firebaseApp);

// Test function to check if user data exists in Realtime Database
export async function checkUserInDatabase(userId) {
  try {
    const userRef = db.ref('users/' + userId);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();
    
    if (userData) {
      console.log('✅ User found in Realtime Database:');
      console.log('User ID:', userId);
      console.log('Name:', userData.name);
      console.log('Email:', userData.email);
      console.log('Account Type:', userData.accountType);
      console.log('Provider:', userData.provider);
      console.log('Created At:', userData.createdAt);
      console.log('Last Login:', userData.lastLoginAt);
      console.log('Status:', userData.status);
      return true;
    } else {
      console.log('❌ User not found in Realtime Database for ID:', userId);
      return false;
    }
  } catch (error) {
    console.error('Error checking user in database:', error);
    return false;
  }
}

// Test function to list all users in the database
export async function listAllUsers() {
  try {
    const usersRef = db.ref('users');
    const snapshot = await usersRef.once('value');
    const users = snapshot.val();
    
    if (users) {
      console.log('📋 All users in Realtime Database:');
      Object.keys(users).forEach(userId => {
        const user = users[userId];
        console.log(`- ${user.name} (${user.email}) - ${user.provider} - ${user.status}`);
      });
      return users;
    } else {
      console.log('📋 No users found in Realtime Database');
      return {};
    }
  } catch (error) {
    console.error('Error listing users:', error);
    return {};
  }
}

// Test function to get database structure
export async function getDatabaseStructure() {
  try {
    const rootRef = db.ref('/');
    const snapshot = await rootRef.once('value');
    const data = snapshot.val();
    
    console.log('🗂️ Database structure:');
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error getting database structure:', error);
    return null;
  }
}

// Example usage (uncomment to test)
/*
import { checkUserInDatabase, listAllUsers, getDatabaseStructure } from './test-database.js';

// Test with a specific user ID
// await checkUserInDatabase('your-user-id-here');

// List all users
// await listAllUsers();

// Get database structure
// await getDatabaseStructure();
*/ 