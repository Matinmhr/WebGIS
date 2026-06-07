// 1. LAYERS BASE
const osm = new ol.layer.Tile({
  title: 'OpenStreetMap',
  type: 'base',
  visible: false,
  source: new ol.source.OSM()
});

const groupColors = {
  'Base Maps': '#3498db',
  'NO2': '#8B5CF6',      // ← deve corrispondere al title del gruppo
  'PM2.5': '#EF4444',    // ← idem
  'PM10': '#F97316'      // ← idem
};

const sentinel2 = new ol.layer.Tile({ //default one
  title: 'Sentinel-2 Cloudless 2020',
  type: 'base',
  visible: true,
  source: new ol.source.XYZ({
    url: 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg',
    attributions: 'Sentinel-2 cloudless - <a href="https://s2maps.eu">https://s2maps.eu</a> by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2020)'
  })
});

// no2 layers
let December_2023_no2 = new ol.layer.Image({
  title: 'December 2023 no2',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_CAMS_no2_2023_12', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let AMAC_no2 = new ol.layer.Image({
  title: 'AMAC no2',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_no2_2021_2023_AMAC_map', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let Average_2023_no2= new ol.layer.Image({
  title: 'Average 2023 no2',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_average_no2_2023', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let Concentration_2023_no2 = new ol.layer.Image({
  title: 'Concentration 2023 no2',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_no2_concentration_map_2023', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let Bivariate_map_no2 = new ol.layer.Image({
  title: 'Bivariate Map no2',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_no2_2023_bivariate', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let LCC_no2 = new ol.layer.Image({
  title: 'LCC built area',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_LCC_2021_2023_built_area', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});


// pm2.5 layers
let December_2023_pm2p5 = new ol.layer.Image({
  title: 'December 2023 pm2.5',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_CAMS_pm2p5_2023_12', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let AMAC_pm2p5 = new ol.layer.Image({
  title: 'AMAC pm2.5',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_pm2p5_2021_2023_AMAC_map', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let Average_2023_pm2p5= new ol.layer.Image({
  title: 'Average 2023 pm2.5',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_average_pm2p5_2023', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let Concentration_2023_pm2p5 = new ol.layer.Image({
  title: 'Concentration 2023 pm2.5',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_pm2p5_concentration_map_2023', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let Bivariate_map_pm2p5 = new ol.layer.Image({
  title: 'Bivariate Map pm2.5',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_pm2p5_2023_bivariate', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let LCC_pm2p5 = new ol.layer.Image({
  title: 'LCC crops',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_LCC_2021_2023_crops', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});


//pm10 layers
let December_2023_pm10 = new ol.layer.Image({
  title: 'December 2023 pm10',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_CAMS_pm10_2023_12', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});
console.log('Source:', December_2023_pm10.getSource());
console.log('Params:', December_2023_pm10.getSource().getParams());

let AMAC_pm10 = new ol.layer.Image({
  title: 'AMAC pm10',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_pm10_2021_2023_AMAC_map', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let Average_2023_pm10= new ol.layer.Image({
  title: 'Average 2023 pm10',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_average_pm10_2023', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let Concentration_2023_pm10 = new ol.layer.Image({
  title: 'Concentration 2023 pm10',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_pm10_concentration_map_2023', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let Bivariate_map_pm10 = new ol.layer.Image({
  title: 'Bivariate Map pm10',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_pm10_2023_bivariate', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

let LCC_pm10 = new ol.layer.Image({
  title: 'LCC trees',
  visible: false,
  source: new ol.source.ImageWMS({
    url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms',
    params: { 'LAYERS': 'gisgeoserver_16:Belgium_LCC_2021_2023_tree', 'FORMAT': 'image/png', 'TRANSPARENT': true }
  })
});

// aggiungi colombiaRivers e colombiaRoads allo stesso modo...

// 3. GRUPPI
let basemapLayers = new ol.layer.Group({
  title: 'Base Maps',
  layers: [osm, sentinel2]
});

let no2 = new ol.layer.Group({
  title: 'NO2',
  layers: [LCC_no2, Bivariate_map_no2, AMAC_no2, Concentration_2023_no2, Average_2023_no2,  December_2023_no2]
});

let pm2p5 = new ol.layer.Group({
  title: 'PM2.5',
  layers: [LCC_pm2p5, Bivariate_map_pm2p5, AMAC_pm2p5, Concentration_2023_pm2p5, Average_2023_pm2p5,  December_2023_pm2p5]
});

let pm10 = new ol.layer.Group({
  title: 'PM10',
  layers: [LCC_pm10, Bivariate_map_pm10, AMAC_pm10, Concentration_2023_pm10, Average_2023_pm10,  December_2023_pm10]
});

const lccBuiltAreaClasses = {
  107: 'Water → Built Area',
  207: 'Trees → Built Area',
  407: 'Flooded Vegetation → Built Area',
  507: 'Crops → Built Area',
  707: 'Built Area → Built Area',
  807: 'Bare Ground → Built Area',
  907: 'Snow/Ice → Built Area',
  1107: 'Rangeland → Built Area',
  701: 'Built Area → Water',
  702: 'Built Area → Trees',
  704: 'Built Area → Flooded Vegetation',
  705: 'Built Area → Crops',
  708: 'Built Area → Bare Ground',
  709: 'Built Area → Snow/Ice',
  711: 'Built Area → Rangeland',
};

const lccTreesClasses = {
  202: 'Trees → Trees',
  102: 'Water → Trees',
  402: 'Flooded Vegetation → Trees',
  502: 'Crops → Trees',
  702: 'Built Area → Trees',
  802: 'Bare Ground → Trees',
  902: 'Snow/Ice → Trees',
  1102: 'Rangeland → Trees',
  201: 'Trees → Water',
  204: 'Trees → Flooded Vegetation',
  205: 'Trees → Crops',
  207: 'Trees → Built Area',
  208: 'Trees → Bare Ground',
  209: 'Trees → Snow/Ice',
  211: 'Trees → Rangeland',
};

const lccCropsClasses = {
  505: 'Crops → Crops',
  105: 'Water → Crops',
  205: 'Trees → Crops',
  405: 'Flooded Vegetation → Crops',
  705: 'Built Area → Crops',
  805: 'Bare Ground → Crops',
  905: 'Snow/Ice → Crops',
  1105: 'Rangeland → Crops',
  501: 'Crops → Water',
  502: 'Crops → Trees',
  504: 'Crops → Flooded Vegetation',
  507: 'Crops → Built Area',
  508: 'Crops → Bare Ground',
  509: 'Crops → Snow/Ice',
  511: 'Crops → Rangeland',
};


//for map
const initialZoom = 7;
const initialCoordinates = [4.4699, 50.5039];

var map = new ol.Map({
  target: document.getElementById('map'),
  layers: [basemapLayers, no2, pm2p5, pm10],  // ← gruppi, non osm direttamente
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
  'AMAC no2': {
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
  'AMAC pm10': {
  title: 'PM10 Change 2021-2023',
  items: [
    { color: '#0b0dff', label: '≤ -10 µg/m³' },
    { color: '#6e62d4', label: '-10 — -4 µg/m³' },
    { color: '#96fc8c', label: '-4 — 0 µg/m³' },
    { color: '#fafca2', label: '0 — 4 µg/m³' },
    { color: '#fbb093', label: '4 — 10 µg/m³' },
    { color: '#c81136', label: '> 10 µg/m³' },
  ]
},
  'AMAC pm2.5': {
    title: 'PM2.5 Change 2021-2023',
    items: [
      { color: '#2534a8', label: '≤ -3 µg/m³' },
      { color: '#6e62d4', label: '-3 — -1.5 µg/m³' },
      { color: '#a0d385', label: '-1.5 — 0 µg/m³' },
      { color: '#cbd07a', label: '0 — 1.5 µg/m³' },
      { color: '#d68574', label: '1.5 — 3 µg/m³' },
      { color: '#b22625', label: '> 3 µg/m³' }
    ]
  },
  'Concentration 2023 no2': {
    title: 'NO₂ Concentration 2023',
    items: [
      { color: '#8ec9db', label: '≤ 10 µg/m³' },
      { color: '#4c8fa0', label: '10 — 25 µg/m³' },
      { color: '#bdbf9b', label: '25 — 40 µg/m³' },
      { color: '#e2624a', label: '40 — 50 µg/m³' },
      { color: '#7a0403', label: '> 50 µg/m³' }
    ]
  },
  'Concentration 2023 pm2.5': {
    title: 'PM2.5 Concentration 2023',
    items: [
      { color: '#8ec9db', label: '<= 5 ug/m3' },
      { color: '#4c8fa0', label: '5 - 10 ug/m3' },
      { color: '#bdbf9b', label: '10 - 15 ug/m3' },
      { color: '#e2624a', label: '15 - 25 ug/m3' },
      { color: '#7a0403', label: '> 25 ug/m3' }
    ]
  },
  'Concentration 2023 pm10': {
    title: 'PM10 Concentration 2023',
    items: [
      { color: '#8ec9db', label: '<= 15 ug/m3' },
      { color: '#4c8fa0', label: '16 - 31 ug/m3' },
      { color: '#bdbf9b', label: '32 - 40 ug/m3' },
      { color: '#e2624a', label: '41 - 50 ug/m3' },
      { color: '#7a0403', label: '> 50 ug/m3' }
    ]
  },
   'December 2023 no2': {
    title: 'NO₂ December 2023 (µg/m³)',
    items: [
    { color: '#30123b', label: '5.0 µg/m³' },
    { color: '#4662d8', label: '6.8 µg/m³' },
    { color: '#35abf8', label: '8.6 µg/m³' },
    { color: '#1be5b5', label: '10.4 µg/m³' },
    { color: '#74fe5d', label: '12.2 µg/m³' },
    { color: '#c9ef34', label: '14.1 µg/m³' },
    { color: '#fbb938', label: '15.9 µg/m³' },
    { color: '#f56918', label: '17.7 µg/m³' },
    { color: '#c92903', label: '19.5 µg/m³' },
    { color: '#7a0403', label: '21.3 µg/m³' },
    ]
   },

   'December 2023 pm2.5': {
  title: 'PM2.5 December 2023 (µg/m³)',
  items: [
    { color: '#30123b', label: '3.98 µg/m³' },
    { color: '#4662d8', label: '4.70 µg/m³' },
    { color: '#35abf8', label: '5.43 µg/m³' },
    { color: '#1be5b5', label: '6.15 µg/m³' },
    { color: '#74fe5d', label: '6.88 µg/m³' },
    { color: '#c9ef34', label: '7.60 µg/m³' },
    { color: '#fbb938', label: '8.33 µg/m³' },
    { color: '#f56918', label: '9.05 µg/m³' },
    { color: '#c92903', label: '9.78 µg/m³' },
    { color: '#7a0403', label: '10.50 µg/m³' },
  ]
},

   'Average 2023 no2': {
    title: 'NO₂ Average 2023 (µg/m³)',
    items: [
    { color: '#30123b', label: '4.5 µg/m³' },
    { color: '#4662d8', label: '6.4 µg/m³' },
    { color: '#35abf8', label: '8.3 µg/m³' },
    { color: '#1be5b5', label: '10.3 µg/m³' },
    { color: '#74fe5d', label: '12.2 µg/m³' },
    { color: '#c9ef34', label: '14.1 µg/m³' },
    { color: '#fbb938', label: '16.1 µg/m³' },
    { color: '#f56918', label: '18.0 µg/m³' },
    { color: '#c92903', label: '19.9 µg/m³' },
    { color: '#7a0403', label: '21.9 µg/m³' },
   ]
   },

   'Average 2023 pm2.5': {
  title: 'PM2.5 Average 2023 (µg/m³)',
  items: [
    { color: '#30123b', label: '4.79 µg/m³' },
    { color: '#4662d8', label: '5.47 µg/m³' },
    { color: '#35abf8', label: '6.16 µg/m³' },
    { color: '#1be5b5', label: '6.84 µg/m³' },
    { color: '#74fe5d', label: '7.52 µg/m³' },
    { color: '#c9ef34', label: '8.21 µg/m³' },
    { color: '#fbb938', label: '8.89 µg/m³' },
    { color: '#f56918', label: '9.57 µg/m³' },
    { color: '#c92903', label: '10.26 µg/m³' },
    { color: '#7a0403', label: '10.94 µg/m³' },
  ]
},

'Average 2023 pm10': {
  title: 'PM10 Average 2023 (µg/m³)',
  items: [
    { color: '#30123b', label: '8.14 µg/m³' },
    { color: '#4662d8', label: '9.29 µg/m³' },
    { color: '#35abf8', label: '10.44 µg/m³' },
    { color: '#1be5b5', label: '11.59 µg/m³' },
    { color: '#74fe5d', label: '12.74 µg/m³' },
    { color: '#c9ef34', label: '13.89 µg/m³' },
    { color: '#fbb938', label: '15.04 µg/m³' },
    { color: '#f56918', label: '16.18 µg/m³' },
    { color: '#c92903', label: '17.33 µg/m³' },
    { color: '#7a0403', label: '18.48 µg/m³' },
  ]
},

'December 2023 pm10': {
  title: 'PM10 December 2023 (µg/m³)',
  items: [
    { color: '#30123b', label: '6.19 µg/m³' },
    { color: '#4662d8', label: '7.34 µg/m³' },
    { color: '#35abf8', label: '8.48 µg/m³' },
    { color: '#1be5b5', label: '9.63 µg/m³' },
    { color: '#74fe5d', label: '10.77 µg/m³' },
    { color: '#c9ef34', label: '11.92 µg/m³' },
    { color: '#fbb938', label: '13.06 µg/m³' },
    { color: '#f56918', label: '14.21 µg/m³' },
    { color: '#c92903', label: '15.35 µg/m³' },
    { color: '#7a0403', label: '16.50 µg/m³' },
  ]
},

  'Bivariate Map no2': {
   title: 'NO₂ & Population (Bivariate)',
   items: [
    { color: '#fffffe', label: '11' },
    { color: '#ffe8ee', label: '12' },
    { color: '#ffcbd7', label: '13' },
    { color: '#ffaec6', label: '14' },
    { color: '#ff88a6', label: '15' },
    { color: '#ddfffe', label: '21' },
    { color: '#cddfdb', label: '22' },
    { color: '#bbb8cb', label: '23' },
    { color: '#a9a8b4', label: '24' },
    { color: '#b08ea6', label: '25' },
    { color: '#b9fffc', label: '31' },
    { color: '#a4dfdd', label: '32' },
    { color: '#95b6c3', label: '33' },
    { color: '#8a9cad', label: '34' },
    { color: '#7d8ba1', label: '35' },
    { color: '#7cfdfd', label: '41' },
    { color: '#64dbdc', label: '42' },
    { color: '#54b5bd', label: '43' },
    { color: '#4591a0', label: '44' },
    { color: '#397e8d', label: '45' },
    { color: '#50fffd', label: '51' },
    { color: '#44d6d4', label: '52' },
    { color: '#3c9fad', label: '53' },
    { color: '#32788f', label: '54' },
    { color: '#2a6682', label: '55' },
  ]
},
 'Bivariate Map pm10': {
   title: 'pm10 & Population (Bivariate)',
   items: [
    { color: '#fffffe', label: '11' },
    { color: '#ffe8ee', label: '12' },
    { color: '#ffcbd7', label: '13' },
    { color: '#ffaec6', label: '14' },
    { color: '#ff88a6', label: '15' },
    { color: '#ddfffe', label: '21' },
    { color: '#cddfdb', label: '22' },
    { color: '#bbb8cb', label: '23' },
    { color: '#a9a8b4', label: '24' },
    { color: '#b08ea6', label: '25' },
    { color: '#b9fffc', label: '31' },
    { color: '#a4dfdd', label: '32' },
    { color: '#95b6c3', label: '33' },
    { color: '#8a9cad', label: '34' },
    { color: '#7d8ba1', label: '35' },
    { color: '#7cfdfd', label: '41' },
    { color: '#64dbdc', label: '42' },
    { color: '#54b5bd', label: '43' },
    { color: '#4591a0', label: '44' },
    { color: '#397e8d', label: '45' },
    { color: '#50fffd', label: '51' },
    { color: '#44d6d4', label: '52' },
    { color: '#3c9fad', label: '53' },
    { color: '#32788f', label: '54' },
    { color: '#2a6682', label: '55' },
  ]
},

'LCC trees': {
  title: 'Land Cover Change - Trees 2021-2023',
  items: [
    { color: '#1a5c1a', label: 'Trees → Trees' },
    { color: '#ed022a', label: 'Trees → Other' },
    { color: '#1a5bab', label: 'Other → Trees' },
    { color: '#ffffff', label: 'Other data' },
  ]
},

'LCC crops': {
  title: 'Land Cover Change - Crops 2021-2023',
  items: [
    { color: '#c8a951', label: 'Crops → Crops' },
    { color: '#ed022a', label: 'Crops → Other' },
    { color: '#358221', label: 'Other → Crops' },
    { color: '#ffffff', label: 'Other data' },
  ]
},

'LCC built area': {
  title: 'Land Cover Change - Built Area 2021-2023',
  items: [
    { color: '#4d4d4d', label: 'Built Area → Built Area' },
    { color: '#1a8a3a', label: 'Other → Built Area' },
    { color: '#ed022a', label: 'Built Area → Other' },
    { color: '#ffffff', label: 'Other data' },
  ]
},

'Bivariate Map pm2.5': {
   title: 'pm2.5 & Population (Bivariate)',
   items: [
    { color: '#fffffe', label: '11' },
    { color: '#ffe8ee', label: '12' },
    { color: '#ffcbd7', label: '13' },
    { color: '#ffaec6', label: '14' },
    { color: '#ff88a6', label: '15' },
    { color: '#ddfffe', label: '21' },
    { color: '#cddfdb', label: '22' },
    { color: '#bbb8cb', label: '23' },
    { color: '#a9a8b4', label: '24' },
    { color: '#b08ea6', label: '25' },
    { color: '#b9fffc', label: '31' },
    { color: '#a4dfdd', label: '32' },
    { color: '#95b6c3', label: '33' },
    { color: '#8a9cad', label: '34' },
    { color: '#7d8ba1', label: '35' },
    { color: '#7cfdfd', label: '41' },
    { color: '#64dbdc', label: '42' },
    { color: '#54b5bd', label: '43' },
    { color: '#4591a0', label: '44' },
    { color: '#397e8d', label: '45' },
    { color: '#50fffd', label: '51' },
    { color: '#44d6d4', label: '52' },
    { color: '#3c9fad', label: '53' },
    { color: '#32788f', label: '54' },
    { color: '#2a6682', label: '55' },
  ]
}

  // aggiungi altri layer qui con lo stesso schema
};
function getLayerGroup(layer) {
  let foundGroup = null;
  map.getLayers().forEach(group => {
    if (group.getLayers) {
      group.getLayers().forEach(l => {
        if (l === layer) foundGroup = group.get('title');
      });
    }
  });
  return foundGroup;
}

function updateLegend(layerTitle) {
  const legendContent = document.getElementById('legend-content');
  const legendTitle = document.querySelector('.legend-title');
  const legendContainer = document.querySelector('.legend-container');
  const data = legendData[layerTitle];

  if (!data) {
    legendContent.innerHTML = '';
    legendTitle.textContent = 'Legend';
    legendContainer.style.border = '6px solid transparent';
    return;
  }

  // trova il gruppo del layer attivo
  const topLayer = getTopmostVisibleLayer();
  const groupName = topLayer ? getLayerGroup(topLayer) : null;
  const color = groupColors[groupName] || '#cccccc';
  legendContainer.style.border = `6px solid ${color}`;

  legendTitle.textContent = data.title;
  legendContent.innerHTML = data.items.map(item => `
    <div class="legend-item">
      <div class="legend-color" style="background-color: ${item.color}"></div>
      <span class="legend-label">${item.label}</span>
    </div>
  `).join('');
}



// legenda iniziale al caricamento
updateLegend();

function getTopmostVisibleLayer() {
  let result = null;
  [pm10, pm2p5, no2].forEach(group => {  
    if (result) return;
    const layers = group.getLayers().getArray().slice().reverse();
    const found = layers.find(l => l.getVisible());
    if (found) result = found;
  });
  return result;
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
[LCC_no2, Bivariate_map_no2, AMAC_no2, Concentration_2023_no2, Average_2023_no2, December_2023_no2, LCC_pm2p5, Bivariate_map_pm2p5, AMAC_pm2p5, Concentration_2023_pm2p5, Average_2023_pm2p5, December_2023_pm2p5, LCC_pm10,  Bivariate_map_pm10, AMAC_pm10, Concentration_2023_pm10, Average_2023_pm10,  December_2023_pm10].forEach(layer => {
  layer.on('change:visible', function() {
    refreshLegend();
  });
});

// legenda iniziale
refreshLegend();



//when clicking on map the function gives you the value
map.on('singleclick', function(evt) {
  const topLayer = getTopmostVisibleLayer();
  if (!topLayer) return;

  const source = topLayer.getSource();
  if (!source.getFeatureInfoUrl) return;

  const url = source.getFeatureInfoUrl(
    evt.coordinate,
    map.getView().getResolution(),
    map.getView().getProjection(),
    { 'INFO_FORMAT': 'text/plain', 'FEATURE_COUNT': 1 }
  );

  if (url) {
    fetch(url)
      .then(response => response.text())
      .then(text => {
        // per raster
        let match = text.match(/GRAY_INDEX\s*=\s*([\d\.\-]+)/);
        let value = null;  // ← aggiungi questa riga

        if (match) {
          const classe = parseInt(match[1]);
          const classiConcentration = {
            1: '≤ 10 µg/m³',
            2: '10 — 25 µg/m³',
            3: '25 — 40 µg/m³',
            4: '40 — 50 µg/m³',
            5: '> 50 µg/m³'
          };

          if (['Concentration 2023 no2', 'Concentration 2023 pm2.5', 'Concentration 2023 pm10'].includes(topLayer.get('title'))) {
            value = classiConcentration[classe] || 'No data';
          } else if (topLayer.get('title') === 'LCC built area') {
             value = lccBuiltAreaClasses[classe] || 'No data';
          } else if (topLayer.get('title') === 'LCC trees') {
             value = lccTreesClasses[classe] || 'No data';
          } else if (topLayer.get('title') === 'LCC crops') {
             value = lccCropsClasses[classe] || 'No data';
           }
            else {
            value = parseFloat(match[1]).toFixed(2) + ' µg/m³';
          }
        }

        //bivariate 
        if (!value) {
          const biv = text.match(/bivariate\s*=\s*([\d\.\-]+)/);
          value = biv ? 'Class: ' + biv[1] : null;
        }

        
        const area = text.match(/gaul2_name\s*=\s*(.+)/);
        const areaName = area ? area[1].trim() : '';

        if (!value) value = 'No data';

        showPopup(evt.pixel, topLayer.get('title'), value, areaName);
      })
      .catch(err => console.log('fetch error:', err));
  }
});

function showPopup(pixel, layerTitle, value, areaName) {
  const existing = document.getElementById('map-popup');
  if (existing) existing.remove();

  const popup = document.createElement('div');
  popup.id = 'map-popup';
  popup.innerHTML = `
    <div class="popup-content">
      <span class="popup-close" onclick="this.parentElement.parentElement.remove()">✕</span>
      <strong>${layerTitle}</strong>
      ${areaName ? `<p>${areaName}</p>` : ''}
      <p>Value: <b>${value}</b></p>
    </div>
  `;
  document.getElementById('map').appendChild(popup);
  popup.style.left = pixel[0] + 'px';
  popup.style.top = pixel[1] + 'px';
}
December_2023_pm10.getSource().on('imageloaderror', function(event) {
  console.log('Image load error:', event);
  console.log('URL:', event.image.src_);
});
