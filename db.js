const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Test the connection
async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('your_table')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Connection error:', error.message);
    } else {
      console.log('Connected successfully:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Run connection test
testConnection();

// Export database client and utility functions
module.exports = {
  supabase,
  
  // Query helper functions
  async query(table, operation = 'select', options = {}) {
    try {
      let query = supabase.from(table);
      
      if (operation === 'select') {
        query = query.select(options.select || '*');
        if (options.filter) query = query.eq(options.filter.key, options.filter.value);
        if (options.limit) query = query.limit(options.limit);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },
  
  // Insert helper
  async insert(table, data) {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert([data]);
      if (error) throw error;
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },
  
  // Update helper
  async update(table, id, updates) {
    try {
      const { data, error } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },
  
  // Delete helper
  async delete(table, id) {
    try {
      const { data, error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }
};
