//FSK Layer
import {sleStyle} from "./mystyles"
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
  
     
  export {exp_bw_sle_layer}
