import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://vrfdokcepxsbujuvyzyq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZmRva2NlcHhzYnVqdXZ5enlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NzYwMDksImV4cCI6MjA2NTM1MjAwOX0.GqE9DB7s4upu7pYKBXtu0yZoXDGSji4gtvXNr2l85zY')