const wmsUrl = 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_16/wms';

const osm = new ol.layer.Tile({
  title: 'OpenStreetMap',
  type: 'base',
  visible: false,
  source: new ol.source.OSM()
});

const sentinel2 = new ol.layer.Tile({
  title: 'Sentinel-2 Cloudless 2020',
  type: 'base',
  visible: true,
  source: new ol.source.XYZ({
    url: 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg',
    attributions: 'Sentinel-2 cloudless by EOX IT Services GmbH'
  })
});

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


const basemapLayers = new ol.layer.Group({
  title: 'Base Maps',
  layers: [osm, sentinel2]
});

const no2 = new ol.layer.Group({
  title: 'NO2',
  layers: [
    LCC_no2,
    Bivariate_map_no2,
    AMAC_no2,
    Concentration_2023_no2,
    Average_2023_no2,
    December_2023_no2,
    
  ]
});

const map = new ol.Map({
  target: document.getElementById('map'),
  layers: [basemapLayers, no2],
  view: new ol.View({
    center: ol.proj.fromLonLat([4.4699, 50.5039]),
    zoom: 7
  })
});

map.addControl(new ol.control.ScaleLine());
map.addControl(new ol.control.FullScreen());
map.addControl(new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-control',
  placeholder: '0.0000, 0.0000'
}));
map.addControl(new ol.control.LayerSwitcher({ tipLabel: 'Layers' }));

const legendColor = '#8B5CF6';

const concentrationClasses = {
  1: '<= 10 ug/m3',
  2: '10 - 25 ug/m3',
  3: '25 - 40 ug/m3',
  4: '40 - 50 ug/m3',
  5: '> 50 ug/m3'
};


const BuiltareaClasses = {
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

const legendData = {
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

  'LCC built area': {
  title: 'Land Cover Change - Built Area 2021-2023',
  items: [
    { color: '#4d4d4d', label: 'Built Area → Built Area' },
    { color: '#1a8a3a', label: 'Other → Built Area' },
    { color: '#ed022a', label: 'Built Area → Other' },
    { color: '#ffffff', label: 'Other data' },

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
}
};

const no2Layers = [
  LCC_no2,
  Bivariate_map_no2,
  AMAC_no2,
  Concentration_2023_no2,
  Average_2023_no2,
  December_2023_no2,
];

const tableRows = [
  ['Stability / Persistence', '95.54%', 'Built Area → Built Area'],
  ['Primary Source of Gain', '65.95%', 'Crops → Built Area'],
  ['Secondary Source of Gain', '22.67%', 'Trees → Built Area'],
  ['Third Source of Gain', '7.64%', 'Rangeland → Built Area'],
  ['Primary Destination of Loss', '74.46%', 'Built Area → Crops'],
  ['Secondary Destination of Loss', '13.74%', 'Built Area → Trees'],
  ['Third Destination of Loss', '8.68%', 'Built Area → Rangeland']
];

const pieChartData = {
  labels: ['Very low pollutant concentration', 'Low pollutant concentration '],
  values: [2.46, 97.54],
  colors: ['#b22625', '#e2624a']
};

const barChartData = {
  labels: ['Stable', 'Gain', 'Loss'],
  datasets: [
    {
      label: 'Mean',
      values: [-2.837755013072697, -2.625214142661064, -2.661103003374027],
      color: '#ef4444'
    },
    {
      label: 'Min',
      values: [-5.173546314239502, -5.173546314239502, -5.173546314239502],
      color: '#f97316'
    },
    {
      label: 'Max',
      values: [-0.7195926308631897, -0.7195926308631897, -0.7195926308631897],
      color: '#fbbf24'
    }
  ]
};

let syncingLayerVisibility = false;

function getTopmostVisibleLayer() {
  return no2.getLayers().getArray().slice().reverse().find(layer => layer.getVisible()) || null;
}

function updateLegend() {
  const topLayer = getTopmostVisibleLayer();
  const legendContent = document.getElementById('legend-content');
  const legendTitle = document.querySelector('.legend-title');
  const legendContainer = document.querySelector('.legend-container');
  const data = topLayer ? legendData[topLayer.get('title')] : null;

  if (!data) {
    legendContent.innerHTML = '';
    legendTitle.textContent = 'Legend';
    legendContainer.style.borderColor = 'transparent';
    return;
  }

  legendContainer.style.borderColor = legendColor;
  legendTitle.textContent = data.title;
  legendContent.innerHTML = data.items.map(item => `
    <div class="legend-item">
      <div class="legend-color" style="background-color: ${item.color}"></div>
      <span class="legend-label">${item.label}</span>
    </div>
  `).join('');
}

no2Layers.forEach(layer => {
  layer.on('change:visible', function() {
    if (syncingLayerVisibility) return;

    if (!layer.getVisible()) {
      updateLegend();
      return;
    }

    syncingLayerVisibility = true;
    no2Layers.forEach(otherLayer => {
      if (otherLayer !== layer) otherLayer.setVisible(false);
    });
    syncingLayerVisibility = false;
    updateLegend();
  });
});

updateLegend();
buildTable();
buildBarChart();
buildPieChart();

map.on('singleclick', function(evt) {
  const topLayer = getTopmostVisibleLayer();
  if (!topLayer) return;

  const source = topLayer.getSource();
  const url = source.getFeatureInfoUrl(
    evt.coordinate,
    map.getView().getResolution(),
    map.getView().getProjection(),
    { INFO_FORMAT: 'text/plain', FEATURE_COUNT: 1 }
  );

  if (!url) return;

  fetch(url)
    .then(response => response.text())
    .then(text => {
      const layerTitle = topLayer.get('title');
      const value = getFeatureValue(text, layerTitle);
      const areaName = getTextMatch(text, /gaul2_name\s*=\s*(.+)/);

      showPopup(evt.pixel, layerTitle, value, areaName);
    })
    .catch(error => console.log('Feature info error:', error));
});

function getFeatureValue(text, layerTitle) {
  const grayIndex = getTextMatch(text, /GRAY_INDEX\s*=\s*([\d.-]+)/);
  const bivariate = getTextMatch(text, /bivariate\s*=\s*([\d.-]+)/);

  if (bivariate) {
    return 'Class: ' + bivariate;
  }

  if (!grayIndex) {
    return 'No data';
  }

  if (layerTitle === 'Concentration 2023 no2') {
    return concentrationClasses[parseInt(grayIndex, 10)] || 'No data';
  }

  if (layerTitle === 'LCC built area') {
    return BuiltareaClasses[parseInt(grayIndex, 10)] || 'No data';
  }

  return parseFloat(grayIndex).toFixed(2) + ' ug/m3';
}

function getTextMatch(text, pattern) {
  const match = text.match(pattern);
  return match ? match[1].trim() : '';
}

function showPopup(pixel, layerTitle, value, areaName) {
  const existing = document.getElementById('map-popup');
  if (existing) existing.remove();

  const popup = document.createElement('div');
  popup.id = 'map-popup';
  popup.innerHTML = `
    <div class="popup-content">
      <span class="popup-close" onclick="this.parentElement.parentElement.remove()">x</span>
      <strong>${layerTitle}</strong>
      ${areaName ? `<p>${areaName}</p>` : ''}
      <p>Value: <b>${value}</b></p>
    </div>
  `;

  document.getElementById('map').appendChild(popup);
  popup.style.left = pixel[0] + 'px';
  popup.style.top = pixel[1] + 'px';
}

function buildTable() {
  const tableBody = document.getElementById('table-body');
  if (!tableBody) return;

  tableBody.innerHTML = tableRows.map(row => `
    <tr>
      <td>${row[0]}</td>
      <td><strong>${row[1]}</strong></td>
      <td>${row[2]}</td>
    </tr>
  `).join('');
}

function buildPieChart() {
  const chartCanvas = document.getElementById('pie-chart');
  if (!chartCanvas || !window.Chart) return;

  new Chart(chartCanvas, {
    type: 'pie',
    data: {
      labels: pieChartData.labels,
      datasets: [{
        data: pieChartData.values,
        backgroundColor: pieChartData.colors,
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function buildBarChart() {
  const chartCanvas = document.getElementById('bar-chart');
  if (!chartCanvas || !window.Chart) return;

  new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: barChartData.labels,
      datasets: barChartData.datasets.map(dataset => ({
        label: dataset.label,
        data: dataset.values,
        backgroundColor: dataset.color,
        borderColor: dataset.color,
        borderWidth: 1
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      },
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });
}