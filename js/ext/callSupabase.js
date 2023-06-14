// ------------------------------------------------------------
// Initiate Supabase Calls
// ------------------------------------------------------------
function onMapClick(e) {
    const summaries = fetchSummaries('suburb_summaries', e.latlng.lat, e.latlng.lng);
}

map.on('click', onMapClick);