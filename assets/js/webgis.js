// 1. LAYERS BASE
const osm = new ol.layer.Tile({
  title: 'OpenStreetMap',
  type: 'base',
  visible: false,
  source: new ol.source.OSM()
});

const sentinel2 = new ol.layer.Tile({ //default one
  title: 'Sentinel-2 Cloudless 2020',
  type: 'base',
  visible: true,
  source: new ol.source.XYZ({
    url: 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg',
    attributions: 'Sentinel-2 cloudless - <a href="https://s2maps.eu">https://s2maps.eu</a> by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2020)'
  })
});

// 2. OVERLAY LAYERS (decommentali quando hai i layer su GeoServer)
let December_2023 = new ol.layer.Image({
  title: 'December 2023',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_CAMS_no2_2023_12', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let AMAC = new ol.layer.Image({
  title: 'AMAC',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_no2_2021_2023_AMAC_map', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let Average_2023 = new ol.layer.Image({
  title: 'Average 2023',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_average_no2_2023', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let Concentration_2023 = new ol.layer.Image({
  title: 'Concentration 2023',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_no2_concentration_map_2023', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

// aggiungi colombiaRivers e colombiaRoads allo stesso modo...

// 3. GRUPPI
let basemapLayers = new ol.layer.Group({
  title: 'Base Maps',
  layers: [osm, sentinel2]
});

let overlayLayers = new ol.layer.Group({
  title: 'no2 Layers',
  layers: [AMAC, Concentration_2023, Average_2023,  December_2023]
});

// 4. MAPPA
const initialZoom = 7;
const initialCoordinates = [4.4699, 50.5039];

var map = new ol.Map({
  target: document.getElementById('map'),
  layers: [basemapLayers, overlayLayers],  // ← gruppi, non osm direttamente
  view: new ol.View({
    center: ol.proj.fromLonLat(initialCoordinates),
    zoom: initialZoom
  })
});

// 5. CONTROLLI
map.addControl(new ol.control.ScaleLine());
map.addControl(new ol.control.FullScreen());
map.addControl(new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-control',
  placeholder: '100.0000, 0.0000'
}));
map.addControl(new ol.control.LayerSwitcher({ tipLabel: 'Layers' }));


const legendData = {
  'AMAC': {
    title: 'NO₂ Change 2021-2023',
    items: [
      { color: '#2534a8', label: '≤ -5 µg/m³' },
      { color: '#6e62d4', label: '-5 — -2 µg/m³' },
      { color: '#a0d385', label: '-2 — 0 µg/m³' },
      { color: '#cbd07a', label: '0 — 2 µg/m³' },
      { color: '#d68574', label: '2 — 5 µg/m³' },
      { color: '#b22625', label: '> 5 µg/m³' }
    ]
  },
  'Concentration 2023': {
    title: 'NO₂ Concentration 2023',
    items: [
      { color: '#8ec9db', label: '≤ 10 µg/m³' },
      { color: '#4c8fa0', label: '10 — 25 µg/m³' },
      { color: '#bdbf9b', label: '25 — 40 µg/m³' },
      { color: '#e2624a', label: '40 — 50 µg/m³' },
      { color: '#7a0403', label: '> 50 µg/m³' }
    ]
  }
  // aggiungi altri layer qui con lo stesso schema
};

function updateLegend(layerTitle) {
  const legendContent = document.getElementById('legend-content');
  const legendTitle = document.querySelector('.legend-title');
  const data = legendData[layerTitle];

  if (!data) {
    legendContent.innerHTML = '';
    legendTitle.textContent = 'Legend';
    return;
  }

  legendTitle.textContent = data.title;
  legendContent.innerHTML = data.items.map(item => `
    <div class="legend-item">
      <div class="legend-color" style="background-color: ${item.color}"></div>
      <span class="legend-label">${item.label}</span>
    </div>
  `).join('');
}

// per ogni overlay layer aggiungi questo listener
[AMAC, Concentration_2023].forEach(layer => {
  layer.on('change:visible', function() {
    if (layer.getVisible()) {
      updateLegend(layer.get('title'));
    }
  });
});

// legenda iniziale al caricamento
updateLegend();

function getTopmostVisibleLayer() {
  // overlayLayers è il gruppo, getLayers() restituisce la collezione
  // i layer sono in ordine bottom→top, quindi reverse() per avere top→bottom
  const layers = overlayLayers.getLayers().getArray().slice().reverse();
  return layers.find(layer => layer.getVisible());
}

function refreshLegend() {
  const topLayer = getTopmostVisibleLayer();
  if (topLayer) {
    updateLegend(topLayer.get('title'));
  } else {
    updateLegend(null);  // nessun layer attivo → legenda vuota
  }
}

// ascolta tutti i layer
[AMAC, Concentration_2023, Average_2023, December_2023].forEach(layer => {
  layer.on('change:visible', function() {
    refreshLegend();
  });
});

// legenda iniziale
refreshLegend();

function getTopmostVisibleLayer() {
  const layers = overlayLayers.getLayers().getArray().slice().reverse();
  layers.forEach(l => console.log(l.get('title'), l.getVisible()));
  return layers.find(layer => layer.getVisible());
}