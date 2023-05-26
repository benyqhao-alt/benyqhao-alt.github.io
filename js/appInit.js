// initiate map
const parameters = {
  zoomControl: true,
  position: [-37.8136, 144.96631],
  zoom: 13,
  maxZoom: 20,
  addressControlPosition: "topleft",
};

const map = L.map("map", {
  zoomControl: parameters.zoomControl,
});

map.setView(parameters.position, parameters.zoom);

// set baselayer
L.tileLayer(
  "https://api.mapbox.com/styles/v1/jkantz/cli2m28n5006o01rbdxs04ak6/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamthbnR6IiwiYSI6ImNsaTJseG94azE0YzUzZG9jYTJvM2c2YjAifQ.OE-sFY6-3p3UNu3hiBmPTQ",
  {
    minZoom: parameters.minZoom,
    maxZoom: parameters.maxZoom,
  }
).addTo(map);
