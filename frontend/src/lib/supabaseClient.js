import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://dpwrrgniummeawlciekr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwd3JyZ25pdW1tZWF3bGNpZWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyODYyOTIsImV4cCI6MjA2NDg2MjI5Mn0.-iguFVPQgzmCDXrxz7e5OWPQnvIFr7_Met41bx4e_Aw')