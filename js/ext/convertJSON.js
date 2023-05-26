// Function to convert retrieved JSON to GeoJSON
function convertJSON(resp, variable_name, lowColor, highColor) {
  // Create an empty GeoJSON object
  const geoJSON = {
    type: "FeatureCollection",
    features: []
  };

  // Iterate over each JSON object in the array
  for (const i of resp) {
    // Extract the necessary properties
    const { value, suburb_name, geometry } = i;

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

  console.log(geoJSON)

  layerGroup = L.choropleth(geoJSON, {
    valueProperty: "value", // which property in the features to use
    scale: [lowColor, highColor], // chroma.js scale - include as many as you like
    steps: 10, // number of breaks or steps in range
    mode: "k", // q for quantile, e for equidistant, k for k-means
    style: {
      color: "#fff", // border color
      weight: 1,
      fillOpacity: 0.85,
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(
          '<h2>' + feature.properties.suburb_name + '</h2><b>' + 
          variable_name + ':</b> ' + feature.properties.value + '</p>'
          )
    },
  }).addTo(map);
}




  // // Load features
  // layerGroup = L.geoJSON(geoJSON, {
  //   onEachFeature: function (feature, layer) {
  //     layer.bindPopup('<h2>' + feature.properties.suburb_name + '</h2><b>' + variable_name + ':</b> ' + feature.properties.value + '</p>');
  //   }
  // }).addTo(map)
