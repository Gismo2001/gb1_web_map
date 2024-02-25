// Funktion zur Adresssuche
window.searchAddress = function searchAddress() {
  var address = document.getElementById('addressInput').value;

  // Geokodierung durchführen (Nominatim - OpenStreetMap)
  var apiUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address);

  fetch(apiUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          if (data.length > 0) {
              var location = data[0];

              // Karte auf die gefundenen Koordinaten zentrieren
              map.getView().setCenter(ol.proj.fromLonLat([parseFloat(location.lon), parseFloat(location.lat)]));
              map.getView().setZoom(17); // Zoom-Level anpassen
          } else {
              console.error('Adresse nicht gefunden');
          }
      })
      .catch(function (error) {
          console.error('Geokodierung-Fehler:', error);
      });
}

const son_linStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'rgba(209, 32, 253, 1)',
    width: 2,
  }),
});

const son_punStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color:'rgba(209, 32, 253, 1)' }),
    stroke: new ol.style.Stroke({
      color: 'black',
      width: 2
    }),
    points: 4,
    radius: 7,
    angle: Math.PI / 4
  })
});

const einStyle = new ol.style.Style({
  image: new ol.style.Circle({
    fill: new ol.style.Fill({color:'rgba(209, 32, 253, 1)'}), 
    stroke: new ol.style.Stroke({
      color: 'black',
      width: 0.5
    }),
    radius: 7
  })
});

const queStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color:'rgba(209, 32, 253, 1'}),
    stroke: new ol.style.Stroke({
      color: 'black',
      width: .5
    }),
    points: 4,
    radius: 7,
    angle: Math.PI / 2
  })
});

const dueStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color:'rgba(209, 32, 253, 1'}),
    stroke: new ol.style.Stroke({
      color: 'black',
      width: 2
    }),
    points: 4,
    radius: 7,
    angle: Math.PI / 4
  })
});

const wehStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color: 'green'}),
    stroke: new ol.style.Stroke({
      color: 'black',
      width: 2
    }),
    points: 3,
    radius: 7,
    rotation: 0  // Setzen Sie die Rotation auf 0 für ein Dreieck
  })
});

const bru_nlwknStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color: 'blue'}),
    stroke: new ol.style.Stroke({color: 'grey', width: 1}),
    points: 4,
    radius: 7,
    angle: Math.PI / 4
  })
});

const bru_andereStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color:'rgba(100, 100, 100, 1)'}),
    stroke: new ol.style.Stroke({color: 'grey',width: 1}),
    points: 4,
    radius: 6,
    angle: Math.PI / 4
  })
});

const sleStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color: 'red'}),
    stroke: new ol.style.Stroke({
      color: 'grey',
      width: 2
    }),
    points: 4,
    radius: 7,
    angle: Math.PI / 4
  })
});

const km10scalStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'grey',
    width: .5
  })
});

function getStyleForArtEin(feature) {
  const artValue = feature.get('Ein_ord');
  let fillColor, strokeColor;

  switch (artValue) {
    case '1. Ordnung':
      fillColor = 'rgba(0, 68, 255, .8)';
      strokeColor = 'black';
      break;
    case '2. Ordnung':
      fillColor = 'rgba(214, 0, 0, .8)';
      strokeColor = 'black';
      break;
    case '3. Ordnung':
      fillColor = 'rgba(114, 114, 114, .8)';
      strokeColor = 'black';
      break;
    case 'Sonstige':
      fillColor = 'rgba(27, 117, 0, .8)';
      strokeColor = 'black';
      break;
    default:
      fillColor = 'grey';
      strokeColor = 'grey';
  }

  return new ol.style.Style({
    image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color: fillColor
      }),
      stroke: new ol.style.Stroke({
        color: strokeColor,
        width: 0.5
      }),
      radius: 7
    })
  });
}

//Berechnung Style für FSK
 function getStyleForArtFSK(feature) {
  const artValue = feature.get('Art');
  let fillColor, strokeColor;

  switch (artValue) {
    case 'p':
      fillColor = 'rgba(200, 200, 200, .7)';
      strokeColor = 'grey';
      break;
    case 'o':
      fillColor = 'rgba(255, 220, 220, .7)';
      strokeColor = 'grey';
      break;
    case 'l':
      fillColor = 'rgba(255, 190, 150, .7)';
      strokeColor = 'black';
      break;
    default:
      fillColor = 'rgba(255, 255, 255, 1)';
      strokeColor = 'grey';
  }

  return new ol.style.Style({
    fill: new ol.style.Fill({
      color: fillColor
    }),
    stroke: new ol.style.Stroke({
      color: strokeColor,
      width: 0.5
    })
  });
}

var attribution = new ol.control.Attribution({
  collapsible: false
});

///////////////
var mapView = new ol.View({
  center: ol.proj.fromLonLat([7.2930, 52.6910]),
  zoom: 9
});

var map = new ol.Map({
  target: "map",
  view: mapView,
  controls: ol.control.defaults().extend([attribution])
});
//////////////

//FSK Layer
var exp_allgm_fsk_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/exp_allgm_fsk.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'fsk', // Titel für den Layer-Switcher
  style: getStyleForArtFSK,
  visible: false
})

// sonstige Punkte
var exp_bw_son_lin_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {return './myLayers/exp_bw_son_lin.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'son_lin', // Titel für den Layer-Switcher
  style: son_linStyle,
  visible: false
});

// sonstige Punkte
var exp_bw_son_pun_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {return './myLayers/exp_bw_son_pun.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'son_pun', // Titel für den Layer-Switcher
  style: son_punStyle,
  visible: false
});

// ein
var exp_bw_ein_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {return './myLayers/exp_bw_ein.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'ein', // Titel für den Layer-Switcher
  style: getStyleForArtEin,
  visible: false
});

// que
var exp_bw_que_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function (extent) {
      return './myLayers/exp_bw_que.geojson' + '?bbox=' + extent.join(',');
    },
    strategy: ol.loadingstrategy.bbox
  }),
  title: 'que', // Titel für den Layer-Switcher
  style: queStyle,
  visible: false
});

// due
var exp_bw_due_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function (extent) {
      return './myLayers/exp_bw_due.geojson' + '?bbox=' + extent.join(',');
    },
    strategy: ol.loadingstrategy.bbox
  }),
  title: 'due', // Titel für den Layer-Switcher
  style: dueStyle,
  visible: false
});

// weh
var exp_bw_weh_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function (extent) {
      return './myLayers/exp_bw_weh.geojson' + '?bbox=' + extent.join(',');
    },
    strategy: ol.loadingstrategy.bbox
  }),
  title: 'weh', // Titel für den Layer-Switcher
  style: wehStyle,
  visible: false
});

//sle
var exp_bw_sle_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function (extent) {
      return './myLayers/exp_bw_sle.geojson' + '?bbox=' + extent.join(',');
    },
    strategy: ol.loadingstrategy.bbox
  }),
  title: 'sle', // Titel für den Layer-Switcher
  style: sleStyle,
  visible: true
});

//bru nlwkn
var exp_bw_bru_nlwkn_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/exp_bw_bru_nlwkn.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'bru_nlwkn', // Titel für den Layer-Switcher
  style: bru_nlwknStyle,
  visible: false
});

//bru andere
var exp_bw_bru_andere_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/exp_bw_bru_andere.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'bru_andere', // Titel für den Layer-Switcher
  style: bru_andereStyle,
  visible: false
});

//kilometrierung 10 m
var km10scal_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/km_10_scal.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'km10scal', // Titel für den Layer-Switcher
  style: km10scalStyle,
  visible: true
});

//kilometrierung 100 m
var km100scal_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/km_100_scal.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'km100scal', // Titel für den Layer-Switcher
  style: function(feature, resolution) {
    return km100scalStyle(feature, feature.get('TextString'), resolution);
  },
  visible: true
});

// km 100 Style-Funktion mit Beschriftung
var km100scalStyle = function(feature, text, resolution) {
  var minResolution = 0;
  var maxResolution = 1; 
  if (resolution > minResolution && resolution < maxResolution) {
    return new ol.style.Style({
      text: new ol.style.Text({
        text: text,
        font: 'normal 18px "Arial Light", "Helvetica Neue Light", Arial, sans-serif',
        offsetX: -10,
        offsetY: 10,
        fill: new ol.style.Fill({
          color: 'rgba(128, 128, 128, 1)' // Graue Farbe
        }),
        stroke: new ol.style.Stroke({
          color: '#000000',
          width: 0.25
        })
      })
    });
  } else {
    return null;
  }
};

//kilometrierung 500 m
var km500scal_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/km_500_scal.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'km500scal', // Titel für den Layer-Switcher
  style: function(feature, resolution) {
    return km500scalStyle(feature, feature.get('TextString'), resolution);
  },
  visible: true
});

// Style-Funktion mit Beschriftung
var km500scalStyle = function(feature, text, resolution) {
  var minResolution = 0;
  var maxResolution = 10; 
  if (resolution > minResolution && resolution < maxResolution) {
    return new ol.style.Style({
      text: new ol.style.Text({text: text, font: 'normal 20px "Arial Light", "Helvetica Neue Light", Arial, sans-serif', offsetX: -10, offsetY: 10, fill: new ol.style.Fill({color: 'rgba(0, 0, 0, 1)'}),
      stroke: new ol.style.Stroke({color: '#000000', width: .25 })
      })
    });
  } else {
    return null;
  }
};

//gew Layer
var gew_layer_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/gew.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'gew', // Titel für den Layer-Switcher
  name: 'gew',
  style: new ol.style.Style({
    fill: new ol.style.Fill({ color: 'rgba(0,28, 240, 0.4)' }),
    stroke: new ol.style.Stroke({ color: 'blue', width: 2 })
  })
})
// Hintergrundlayer (BaseLayer)
var dop20ni_layer = new ol.layer.Tile({
  title: "DOP20 NI",
  opacity: 1.000000,
  type: 'base',
  source: new ol.source.TileWMS({
    url: "https://www.geobasisdaten.niedersachsen.de/doorman/noauth/wms_ni_dop",
    attributions: ' ',
    params: {
      "LAYERS": "dop20",
      "TILED": true, // "true" sollte ohne Anführungszeichen sein
      "VERSION": "1.3.0"
    },
  }),
});

var googleLayer = new ol.layer.Tile({
  title: "GoogleSat",
  type: 'base',
  baseLayer: true,
  visible: false,
  source: new ol.source.TileImage({
    url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}'
  })
});

var gnAtlas2023 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "10", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2023",
  opacity: 1.000000,
  visible: false,
});

var gnAtlas2020 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "9", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2020",
  opacity: 1.000000,
  visible: false,
});

var gnAtlas2017 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "8", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2017",
  opacity: 1.000000,
  visible: false,
});

var gnAtlas2014 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "7", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2014",
  opacity: 1.000000,
  visible: false,
});

var gnAtlas2012 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "6", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2012",
  opacity: 1.000000,
  visible: false,
});

var gnAtlas2010 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "5", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2010",
  opacity: 1.000000,
  visible: false,
});

var gnAtlas2009 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "4", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2009",
  opacity: 1.000000,
  visible: false,
});

var gnAtlas2002 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "3", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2002",
  opacity: 1.000000,
  visible: false,
});

var gnAtlas1970 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "2", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "1970",
  opacity: 1.000000,
  visible: false,
});

var gnAtlas1957 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "1", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "1957",
  opacity: 1.000000,
  visible: false,
});

var gnAtlas1937 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "0", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "1937",
  opacity: 1.000000,
  visible: false,
});


var ESRIWorldImagery = new ol.layer.Tile({
  title: 'ESRI',
  type: 'base',
  opacity: 1.000000,
   visible: false,
   source: new ol.source.XYZ({
      attributions: 'Powered by Esri',
      url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  })
});

var emptyBaseLayer = new ol.layer.Tile({
  title: 'Ohne',
  type: 'base',
  source: new ol.source.TileWMS({
    url: 'about:blank', // oder eine leere URL
   }),
});

var osmTile = new ol.layer.Tile({
  title: "osm",
  type: 'base',
  source: new ol.source.OSM({
  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attributions: ['© OpenStreetMap contributors', 'Tiles courtesy of <a href="https://www.openstreetmap.org/"></a>'],
}),
});

var BaseGroup = new ol.layer.Group({
  title: "Hintergrund",
  fold: true,
  fold: 'close',
  layers: [ emptyBaseLayer, ESRIWorldImagery, dop20ni_layer, googleLayer, osmTile]
});

var layerGroup = new ol.layer.Group({
  title: "Bauwerke",
  fold: true,
  fold: 'close',  
  layers: [exp_allgm_fsk_layer, exp_bw_son_lin_layer, exp_bw_son_pun_layer, exp_bw_ein_layer, exp_bw_bru_andere_layer, exp_bw_bru_nlwkn_layer, exp_bw_que_layer, exp_bw_due_layer, exp_bw_weh_layer, exp_bw_sle_layer]
});

var kmGroup = new ol.layer.Group({
  title: "Stationierung",
  fold: true,
  fold: 'close',
  layers: [km10scal_layer, km100scal_layer, km500scal_layer]
});

var satteliteGroup = new ol.layer.Group({
  title: "GN Atlas",
  fold: true,
  fold: 'close',
  layers: [ gnAtlas2023, gnAtlas2020, gnAtlas2017, gnAtlas2014, gnAtlas2012, gnAtlas2010, gnAtlas2009, gnAtlas2002, gnAtlas1970, gnAtlas1957, gnAtlas1937]
});

map.addLayer(BaseGroup);
map.addLayer(satteliteGroup);
map.addLayer(kmGroup);
map.addLayer(gew_layer_layer);
map.addLayer(layerGroup);

// Layerswitcher
var myLayerSwitcher = new LayerSwitcher({
  tipLabel: 'Layerliste', // Tooltips für den gesamten Layer-Switcher
  activationMode: "click",
  startActive: false,
  groupSelectStyle: "group",
  groupCounter: false,
  reverse: true,
  toggleAll: "group",
});

map.addControl(myLayerSwitcher);

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


var popup = new ol.Overlay({
  element: container,//document.getElementById('popup'),
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});

map.addOverlay(popup);

closer.onclick = function()
{
  popup.setPosition(undefined);
  closer.blur();
  return false;
};

// 
map.on('click', function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    var layname = layer.get('title');
    console.log(layname);
    var coordinates = evt.coordinates;
    var beschreibLangValue = feature.get('beschreib_lang');
    var beschreibLangHtml = '';

    if (beschreibLangValue && beschreibLangValue.trim() !== '') {
      // Wenn beschreib_lang einen Wert hat, füge es zum HTML-Code hinzu
      beschreibLangHtml = '<br>' + "Beschreib lang = " + beschreibLangValue + '</p>';
    };

    if (beschreibLangValue && beschreibLangValue.trim() !== '') {
      // Wenn beschreib_lang einen Wert hat, füge es zum HTML-Code hinzu
      beschreibLangHtml = '<br>' + "Beschreib lang = " + beschreibLangValue + '</p>';
    };

    

    // Popup soll nur für bestimmte Layernamen angezeigt werden
    if (layname !== 'gew' && layname !== 'km10scal' && layname !== 'km100scal' && layname !== 'km500scal' && layname !== 'fsk') {
      console.log('Clicked on layer:', layname);
      if (feature) {
        coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);
        // HTML-Tag
        content.innerHTML =
          '<div style="max-height: 200px; overflow-y: auto;">' + // Setzen Sie hier die maximale Höhe ein, die Sie möchten
            '<p style="font-weight: bold; text-decoration: underline;">' + feature.get('Name') + '</p>' +
            '<p>' + "Id = " + feature.get('bw_id') + '</p>' +
            '<p><a href="' + feature.get('foto1') + '" onclick="window.open(\'' + feature.get('foto1') + '\', \'_blank\'); return false;">Foto 1</a> ' +
            '<a href="' + feature.get('foto2') + '" onclick="window.open(\'' + feature.get('foto2') + '\', \'_blank\'); return false;">Foto 2</a> ' +
            '<a href="' + feature.get('foto3') + '" onclick="window.open(\'' + feature.get('foto3') + '\', \'_blank\'); return false;">Foto 3</a> ' +
            '<a href="' + feature.get('foto4') + '" onclick="window.open(\'' + feature.get('foto4') + '\', \'_blank\'); return false;">Foto 4</a></p>' +
            '<br>' + "Beschreib kurz = " + feature.get('Beschreib') + '</p>' +
            beschreibLangHtml +
          '</div>';
        // '<p>' + "Stauziel (Winter) = " + feature.get('Ziel_OW1') + " m NN" + '</p>';
      } else {
        popup.setPosition(undefined);
      }
    }

    // Führen Sie Aktionen für den Layernamen 'weh' durch
    if (layname === 'fsk') {
      coordinates = evt.coordinate; // Define coordinates for 'fsk'
      popup.setPosition(coordinates);
      content.innerHTML =
        '<div style="max-height: 300px; overflow-y: auto;">' + // Setzen Sie hier die maximale Höhe ein, die Sie möchten
        '<h3>' + feature.get('Suche') + '</h3>' +
        '<p>' + "Eigentümer = " + feature.get('Eig1') + '</p>' +
        '</div>';
    }
  });
});

// ...

document.getElementById('popup-closer').onclick = function () {
  popup.setPosition(undefined);
  return false;
};
