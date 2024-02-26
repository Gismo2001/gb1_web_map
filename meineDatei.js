function test(feature) {   
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
        
      })
}
  
export {test}