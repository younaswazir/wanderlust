// Step 1: create map
var map = L.map("map").setView(coordinates, 13);

// Step 2: add tiles (modern look)
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap & Carto",
}).addTo(map);

// Step 3: add marker
var redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [36, 36],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
L.marker(coordinates, { icon: redIcon })
  .addTo(map)
  .bindPopup(siteLocation)
  .openPopup();
