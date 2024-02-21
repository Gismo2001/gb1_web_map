import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { defaults as defaultControls, ZoomToExtent } from 'ol/control';

var mapView = new View({
  center: fromLonLat([7.2930, 52.6910]),
  zoom: 9
});

var map = new Map({
  target: "map",
  layers: [
    new TileLayer({ source: new OSM() }),
  ],
  view: mapView,
  controls: defaultControls({ theme: null }).extend([
    new ZoomToExtent({
      extent: [740000, 6840000, 867000, 7000000],
      label: 'H', // Der Text oder HTML-Inhalt des Buttons
      tipLabel: 'Home'
    })
  ])
});


// GeoJSON-Layer hinzufügen
var geoJsonLayer = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: './myLayers/gew.geojson'
  })
});

// Layer zur Karte hinzufügen
map.addLayer(geoJsonLayer);