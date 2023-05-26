// Initialize Supabase Keys
const SUPABASE_URL = 'https://whqgnkkuvefavbkaajyc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocWdua2t1dmVmYXZia2FhanljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NTkwODMsImV4cCI6MjAwMDIzNTA4M30.Muy6t6J9Vc_iwiW_zpQJdC1OFclaDhJYD-uS-jImVWs'

// Create a single supabase client for interacting with database
const supabaseCredentials = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function for loading data
async function fetchData(tbl, variable_name, lowColor, highColor) {
  const { data, error } = await supabaseCredentials
    .from(tbl)
    .select()

  console.log(data)
  console.log(error)

  const geoJSON = convertJSON(data, variable_name, lowColor, highColor)

  return geoJSON
}