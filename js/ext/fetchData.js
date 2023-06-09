// Initialize Supabase Keys
const SUPABASE_URL = 'https://whqgnkkuvefavbkaajyc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocWdua2t1dmVmYXZia2FhanljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NTkwODMsImV4cCI6MjAwMDIzNTA4M30.Muy6t6J9Vc_iwiW_zpQJdC1OFclaDhJYD-uS-jImVWs'

// Create a single supabase client for interacting with database
const supabaseCredentials = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function for loading summary data
async function fetchSummaries(func, latitude, longitude) {
  const { data, error } = await supabaseCredentials
    .rpc(func, {
      lat: latitude,
      long: longitude
    })

  // console.log(data)
  // console.log(data.Length)
  // console.log(error)
  
  // if (data.Length == undefined) {
  //   console.log('fuck')
  //   return
  // } else {

    const geoJSON = await convertJSON(data, chloropleth = true)
    return geoJSON
  // }
  
};

// Function for loading medians
async function fetchMedians(func, filterName, date) {
  const { data, error } = await supabaseCredentials
    .rpc(func, {
      columnname: filterName,
      censusyear: date
    })

  console.log(data)
  console.log(error)

  stopFlag = true;
  const geoJSON = convertJSON(data, chloropleth = false)
  return geoJSON
};

// Function for loading filtered summaries
async function fetchFiltered(func, filterValue) {
  const { data, error } = await supabaseCredentials
    .rpc(func, { fvalue: filterValue })
    .select()

  // console.log(data)
  // console.log(error)

  stopFlag = true;
  const geoJSON = convertJSON(data, chloropleth = false)
  return geoJSON
};