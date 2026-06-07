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

const December_2023_pm10 = new ol.layer.Image({
  title: 'December 2023 PM 10',
  visible: false,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: { LAYERS: 'gisgeoserver_16:Belgium_CAMS_pm10_2023_12', FORMAT: 'image/png', TRANSPARENT: true }
  })
});

const AMAC_pm10 = new ol.layer.Image({
  title: 'AMAC PM 10',
  visible: false,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: { LAYERS: 'gisgeoserver_16:Belgium_pm10_2021_2023_AMAC_map', FORMAT: 'image/png', TRANSPARENT: true }
  })
});

const Average_2023_pm10 = new ol.layer.Image({
  title: 'Average 2023 PM 10',
  visible: true,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: { LAYERS: 'gisgeoserver_16:Belgium_average_pm10_2023', FORMAT: 'image/png', TRANSPARENT: true }
  })
});

const Concentration_2023_pm10 = new ol.layer.Image({
  title: 'Concentration 2023 PM 10',
  visible: false,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: { LAYERS: 'gisgeoserver_16:Belgium_pm10_concentration_map_2023', FORMAT: 'image/png', TRANSPARENT: true }
  })
});

const Bivariate_map_pm10 = new ol.layer.Image({
  title: 'Bivariate Map PM 10',
  visible: false,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: { LAYERS: 'gisgeoserver_16:Belgium_pm10_2023_bivariate', FORMAT: 'image/png', TRANSPARENT: true }
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


const basemapLayers = new ol.layer.Group({
  title: 'Base Maps',
  layers: [osm, sentinel2]
});

const pm10 = new ol.layer.Group({
  title: 'PM 10',
  layers: [
    LCC_pm10,
    Bivariate_map_pm10,
    AMAC_pm10,
    Concentration_2023_pm10,
    Average_2023_pm10,
    December_2023_pm10
  ]
});

const map = new ol.Map({
  target: document.getElementById('map'),
  layers: [basemapLayers, pm10],
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

const legendColor = '#ef4444';

const concentrationClasses = {
  1: '<= 15 ug/m3',
  2: '16 - 31 ug/m3',
  3: '32 - 40 ug/m3',
  4: '40 - 50 ug/m3',
  5: '> 50 ug/m3'
};

const legendData = {

  'December 2023 PM 10': {
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


  'Average 2023 PM 10': {
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

  'Concentration 2023 PM 10': {
    title: 'PM 10 Concentration 2023',
    items: [
      { color: '#8ec9db', label: concentrationClasses[1] },
      { color: '#4c8fa0', label: concentrationClasses[2] },
      { color: '#bdbf9b', label: concentrationClasses[3] },
      { color: '#e2624a', label: concentrationClasses[4] },
      { color: '#7a0403', label: concentrationClasses[5] }
    ]
  },
  'AMAC PM 10': {
  title: 'PM10 Change 2021-2023',
  items: [
    { color: '#0b0dff', label: '≤ -10 µg/m³' },
    { color: '#27eefe', label: '-10 — -4 µg/m³' },
    { color: '#96fc8c', label: '-4 — 0 µg/m³' },
    { color: '#fafca2', label: '0 — 4 µg/m³' },
    { color: '#fbb093', label: '4 — 10 µg/m³' },
    { color: '#c81136', label: '> 10 µg/m³' },
  ]
},
  'Bivariate Map PM 10': {
    title: 'PM 10 and Population',
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
      { color: '#2a6682', label: '55' }
    ]
  },
  'LCC trees': {
  title: 'Land Cover Change - Trees 2021-2023',
  items: [
    { color: '#1a5c1a', label: 'Trees → Trees' },
    { color: '#ed022a', label: 'Trees → Other' },
    { color: '#1a5bab', label: 'Other → Trees' },
  ]
}
};

const pm10Layers = [
  LCC_pm10,
  Bivariate_map_pm10,
  AMAC_pm10,
  Concentration_2023_pm10,
  Average_2023_pm10,
  December_2023_pm10
];

const tableRows = [
  ['Stability / Persistence', '95.21%', 'Trees → Trees'],
  ['Primary Source of Gain', '48.79%', 'Rangeland → Trees'],
  ['Secondary Source of Gain', '42.07%', 'Crops → Trees'],
  ['Third Source of Gain', '7.19%', 'Built Area → Trees'],
  ['Primary Destination of Loss', '43.92%', 'Trees → Crops'],
  ['Secondary Destination of Loss', '27.78%', 'Trees → Built Area'],
  ['Third Destination of Loss', '26.00%', 'Trees → Rangeland']
];

const pieChartData = {
  labels: ['Very low pollutant concentration', 'Low pollutant concentration '],
  values: [80.2 , 19.8],
  colors: ['#b22625', '#e2624a']
};

const barChartData = {
  labels: ['Stable', 'Gain', 'Loss'],
  datasets: [
    {
      label: 'Mean',
      values: [-2.158648147,-2.151309545,-2.246654204],
      color: '#ef4444'
    },
    {
      label: 'Min',
      values: [-3.335484743, -3.335484743, -3.335484743],
      color: '#f97316'
    },
    {
      label: 'Max',
      values: [-0.420477748, -0.420477748, -0.420477748],
      color: '#fbbf24'
    }
  ]
};

let syncingLayerVisibility = false;

function getTopmostVisibleLayer() {
  return pm10.getLayers().getArray().slice().reverse().find(layer => layer.getVisible()) || null;
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

pm10Layers.forEach(layer => {
  layer.on('change:visible', function() {
    if (syncingLayerVisibility) return;

    if (!layer.getVisible()) {
      updateLegend();
      return;
    }

    syncingLayerVisibility = true;
    pm10Layers.forEach(otherLayer => {
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

  if (layerTitle === 'Concentration 2023 PM 10') {
    return concentrationClasses[parseInt(grayIndex, 10)] || 'No data';
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
