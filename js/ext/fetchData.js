// ------------------------------------------------------------
// Initialize Supabase Keys
// ------------------------------------------------------------
const SUPABASE_URL = 'https://whqgnkkuvefavbkaajyc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocWdua2t1dmVmYXZia2FhanljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NTkwODMsImV4cCI6MjAwMDIzNTA4M30.Muy6t6J9Vc_iwiW_zpQJdC1OFclaDhJYD-uS-jImVWs'

// ------------------------------------------------------------
// Create a single supabase client for interacting with database
// ------------------------------------------------------------
const supabaseRequest = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ------------------------------------------------------------
// Function for loading summary data
// ------------------------------------------------------------
async function fetchSummaries(func, latitude, longitude) {
  const { data, error } = await supabaseRequest
    .rpc(func, {
      lat: latitude,
      long: longitude
    })

  // console.log(data)
  // console.log(error)

  sidebar.enablePanel('home');
  const geoJSON = await convertJSON(data, chloropleth = true);

  return geoJSON;
};

// ------------------------------------------------------------
// Function for loading summary data - additional data
// ------------------------------------------------------------
async function fetchSuburbDetails(suburbName) {
  const { data, error } = await supabaseRequest
    .rpc('melb_suburb_details', {
      suburb: suburbName,
    });

    // median trends
    suburbOverview = '<h3>Suburb Overview</h3>'

    // ancestry
    ancestryGraphs = '<h3>Ancestry</h3>'

    // crime
    crimeGraphs = '<h3>Crime</h3>'
    
    document.getElementById("home-content").innerHTML = suburbOverview + ancestryGraphs + crimeGraphs;
    console.log(data);
};

// ------------------------------------------------------------
// Function for loading medians
// ------------------------------------------------------------
async function fetchMedians(func, filterName, date) {
  const { data, error } = await supabaseRequest
    .rpc(func, {
      columnname: filterName,
      censusyear: date
    })
  sidebar.disablePanel('home');
  stopFlag = true;
  const geoJSON = convertJSON(data, chloropleth = false)
  return geoJSON
};

// ------------------------------------------------------------
// Function for loading filtered summaries
// ------------------------------------------------------------
async function fetchFiltered(func, filterValue) {
  const { data, error } = await supabaseRequest
    .rpc(func, { fvalue: filterValue })
    .select()
  sidebar.disablePanel('home');
  stopFlag = true;
  const geoJSON = convertJSON(data, chloropleth = false)
  return geoJSON
};