import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
}

// GET all users
router.get('/', async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ 
      success: false, 
      error: 'Supabase not configured' 
    });
  }
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ 
      success: false, 
      error: 'Supabase not configured' 
    });
  }
  
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create new user
router.post('/', async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ 
      success: false, 
      error: 'Supabase not configured' 
    });
  }
  
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and email are required' 
      });
    }
    
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email }])
      .select();
    
    if (error) throw error;
    
    res.status(201).json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT update user
router.put('/:id', async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ 
      success: false, 
      error: 'Supabase not configured' 
    });
  }
  
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const { data, error } = await supabase
      .from('users')
      .update({ name, email })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ 
      success: false, 
      error: 'Supabase not configured' 
    });
  }
  
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router; 