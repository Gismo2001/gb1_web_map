//FSK Layer
import { getStyleForArtFSK, getStyleForArtEin, son_linStyle, son_punStyle, queStyle, dueStyle, wehStyle, bru_nlwknStyle, bru_andereStyle, sleStyle, km10scalStyle } from "./mystyles"


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
   
  export { exp_allgm_fsk_layer, exp_bw_son_lin_layer, exp_bw_weh_layer,exp_bw_son_pun_layer,exp_bw_sle_layer, exp_bw_que_layer, exp_bw_ein_layer,exp_bw_due_layer,exp_bw_bru_nlwkn_layer,exp_bw_bru_andere_layer, km10scal_layer, km100scal_layer, km500scal_layer, gew_layer_layer }