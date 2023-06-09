let layerGroup
let stopFlag

// ---------------------------------
// Functions
// ---------------------------------
function clearMap() {
    try {
        map.removeLayer(layerGroup);
    } catch (err) {
        console.log(err)
    }
}

async function zoomHandler(e) {
    if (stopFlag) {
        return;
    } else {
        try {
            sidebar.open("home");
        } catch (err) { }

        stopFlag = true
    }
}

// ---------------------------------
// Initiate Supabase Calls
// ---------------------------------
function onMapClick(e) {
    fetchSummaries('suburb_summaries', e.latlng.lat, e.latlng.lng);
}

map.on('click', onMapClick);