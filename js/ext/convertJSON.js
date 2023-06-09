// // Function to convert retrieved JSON to GeoJSON
function convertJSON(resp, chloropleth) {
  sidebar.close();
  // Create an empty GeoJSON object
  const geoJSON = {
    type: "FeatureCollection",
    features: []
  };

  // Iterate over each JSON object in the array
  for (const i of resp) {
    // Extract the necessary properties
    const { geometry, suburb_name, value } = i;

    // Build a GeoJSON feature object
    const feature = {
      type: "Feature",
      properties: {
        suburb_name,
        value
      },
      geometry
    };
    
    // Add the feature object to the "features" array
    geoJSON.features.push(feature);
  }

  // Load features
  if (chloropleth && geoJSON.features[0]) {
    stopFlag = false;
    clearMap();
    layerGroup = L.geoJSON(geoJSON, {
      style: {
        weight: 1
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<h3>' + feature.properties.suburb_name + '</h3>');
      }
    }).addTo(map)
    
    map.flyToBounds(layerGroup.getBounds())

  } else if (geoJSON.features[0]) {
    clearMap();
    layerGroup = L.choropleth(geoJSON, {
      valueProperty: "value", // which property in the features to use
      scale: ['#DB4437', '#F4B400', '#0F9D58'], // chroma.js scale - include as many as you like
      steps: 100, // number of breaks or steps in range
      mode: "k", // q for quantile, e for equidistant, k for k-means
      style: {
        color: "#fff", // border color
        weight: 1,
        fillOpacity: 0.85,
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<h3>' + feature.properties.suburb_name + '</h3><b>' + Math.abs(feature.properties.value));
      },
    }).addTo(map);

    map.flyToBounds(layerGroup.getBounds())
  } else {
    return
  }
  
  map.on('zoomend', zoomHandler)
}
