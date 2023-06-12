let layerGroup
let stopFlag

// ------------------------------------------------------------
// Functions
// ------------------------------------------------------------
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
            sidebar.open('home');
        } catch (err) { }

        stopFlag = true
    }
}

async function updateSidebar(suburb) {
    setTimeout(() => {
        document.getElementById("home-header").innerHTML = suburb
        + '<span class="leaflet-sidebar-close" onclick="sidebar.close();"><i class="fa fa-caret-left"></i></span>';
        // Call additional values
        fetchSuburbDetails(suburb);
      }, 325);
}

// ------------------------------------------------------------
// Initiate Supabase Calls
// ------------------------------------------------------------
function onMapClick(e) {
    const summaries = fetchSummaries('suburb_summaries', e.latlng.lat, e.latlng.lng);
}

map.on('click', onMapClick);