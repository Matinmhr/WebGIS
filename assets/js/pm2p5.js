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

const December_2023_pm2p5 = new ol.layer.Image({
  title: 'December 2023 PM2.5',
  visible: false,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: { LAYERS: 'gisgeoserver_16:Belgium_CAMS_pm2p5_2023_12', FORMAT: 'image/png', TRANSPARENT: true }
  })
});

const AMAC_pm2p5 = new ol.layer.Image({
  title: 'AMAC PM2.5',
  visible: false,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: { LAYERS: 'gisgeoserver_16:Belgium_pm2p5_2021_2023_AMAC_map', FORMAT: 'image/png', TRANSPARENT: true }
  })
});

const Average_2023_pm2p5 = new ol.layer.Image({
  title: 'Average 2023 PM2.5',
  visible: true,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: { LAYERS: 'gisgeoserver_16:Belgium_average_pm2p5_2023', FORMAT: 'image/png', TRANSPARENT: true }
  })
});

const Concentration_2023_pm2p5 = new ol.layer.Image({
  title: 'Concentration 2023 PM2.5',
  visible: false,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: { LAYERS: 'gisgeoserver_16:Belgium_pm2p5_concentration_map_2023', FORMAT: 'image/png', TRANSPARENT: true }
  })
});

const Bivariate_map_pm2p5 = new ol.layer.Image({
  title: 'Bivariate Map PM2.5',
  visible: false,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: { LAYERS: 'gisgeoserver_16:Belgium_pm2p5_2023_bivariate', FORMAT: 'image/png', TRANSPARENT: true }
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


const basemapLayers = new ol.layer.Group({
  title: 'Base Maps',
  layers: [osm, sentinel2]
});

const pm2p5 = new ol.layer.Group({
  title: 'PM2.5',
  layers: [
    LCC_pm2p5,
    Bivariate_map_pm2p5,
    AMAC_pm2p5,
    Concentration_2023_pm2p5,
    Average_2023_pm2p5,
    December_2023_pm2p5
  ]
});

const map = new ol.Map({
  target: document.getElementById('map'),
  layers: [basemapLayers, pm2p5],
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
  1: '<= 5 ug/m3',
  2: '5 - 10 ug/m3',
  3: '10 - 15 ug/m3',
  4: '15 - 25 ug/m3',
  5: '> 25 ug/m3'
};

const legendData = {
  'December 2023 PM2.5': {
    title: 'PM2.5 December 2023 (ug/m3)',
    items: [
      { color: '#30123b', label: '3.98 ug/m3' },
      { color: '#4662d8', label: '4.70 ug/m3' },
      { color: '#35abf8', label: '5.43 ug/m3' },
      { color: '#1be5b5', label: '6.15 ug/m3' },
      { color: '#74fe5d', label: '6.88 ug/m3' },
      { color: '#c9ef34', label: '7.60 ug/m3' },
      { color: '#fbb938', label: '8.33 ug/m3' },
      { color: '#f56918', label: '9.05 ug/m3' },
      { color: '#c92903', label: '9.78 ug/m3' },
      { color: '#7a0403', label: '10.50 ug/m3' }
    ]
  },
  'Average 2023 PM2.5': {
    title: 'PM2.5 Average 2023 (ug/m3)',
    items: [
      { color: '#30123b', label: '4.79 ug/m3' },
      { color: '#4662d8', label: '5.47 ug/m3' },
      { color: '#35abf8', label: '6.16 ug/m3' },
      { color: '#1be5b5', label: '6.84 ug/m3' },
      { color: '#74fe5d', label: '7.52 ug/m3' },
      { color: '#c9ef34', label: '8.21 ug/m3' },
      { color: '#fbb938', label: '8.89 ug/m3' },
      { color: '#f56918', label: '9.57 ug/m3' },
      { color: '#c92903', label: '10.26 ug/m3' },
      { color: '#7a0403', label: '10.94 ug/m3' }
    ]
  },
  'Concentration 2023 PM2.5': {
    title: 'PM2.5 Concentration 2023',
    items: [
      { color: '#8ec9db', label: concentrationClasses[1] },
      { color: '#4c8fa0', label: concentrationClasses[2] },
      { color: '#bdbf9b', label: concentrationClasses[3] },
      { color: '#e2624a', label: concentrationClasses[4] },
      { color: '#7a0403', label: concentrationClasses[5] }
    ]
  },
  'AMAC PM2.5': {
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
  'Bivariate Map PM2.5': {
    title: 'PM2.5 and Population',
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
'LCC crops': {
title: 'Land Cover Change - Crops 2021-2023',
items: [
  { color: '#c8a951', label: 'Crops → Crops' },
  { color: '#ed022a', label: 'Crops → Other' },
  { color: '#358221', label: 'Other → Crops' },
  { color: '#ffffff', label: 'Other data' },
]
}
};


const pm2p5Layers = [
  LCC_pm2p5,
  Bivariate_map_pm2p5,
  AMAC_pm2p5,
  Concentration_2023_pm2p5,
  Average_2023_pm2p5,
  December_2023_pm2p5
];

const tableRows = [
  ['Stability / Persistence', '95.14%', 'Crops → Crops'],
  ['Primary Source of Gain', '38.80%', 'Built Area → Crops'],
  ['Secondary Source of Gain', '32.37%', 'Rangeland → Crops'],
  ['Third Source of Gain', '26.66%', 'Trees → Crops'],
  ['Primary Destination of Loss', '35.38%', 'Crops → Built Area'],
  ['Secondary Destination of Loss', '33.04%', 'Crops → Rangeland'],
  ['Third Destination of Loss', '30.17%', 'Crops → Trees']
];

const pieChartData = {
  labels: ['Low pollutant concentration', 'Medium pollutant concentration'],
  values: [48.2, 51.8],
  colors: ['#b22625', '#e2624a']
};

const barChartData = {
  labels: ['Stable', 'Gain', 'Loss'],
  datasets: [
    {
      label: 'Mean',
      values: [-1.7952809419896867, -1.5780686537424724, -1.7726302444934845],
      color: '#ef4444'
    },
    {
      label: 'Min',
      values: [-2.4667906761169434, -1.9702379703521729, -2.0833656787872314],
      color: '#f97316'
    },
    {
      label: 'Max',
      values: [-0.5833970904350281, -1.1798348426818848, -1.4285354614257808],
      color: '#fbbf24'
    }
  ]
};

let syncingLayerVisibility = false;

function getTopmostVisibleLayer() {
  return pm2p5.getLayers().getArray().slice().reverse().find(layer => layer.getVisible()) || null;
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

pm2p5Layers.forEach(layer => {
  layer.on('change:visible', function() {
    if (syncingLayerVisibility) return;

    if (!layer.getVisible()) {
      updateLegend();
      return;
    }

    syncingLayerVisibility = true;
    pm2p5Layers.forEach(otherLayer => {
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

  if (layerTitle === 'Concentration 2023 PM2.5') {
    return concentrationClasses[parseInt(grayIndex, 10)] || 'No data';
  }

  if (layerTitle === 'LCC crops') {
    return lccCropsClasses[parseInt(grayIndex, 10)] || 'No data';
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
