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
