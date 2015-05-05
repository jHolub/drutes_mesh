Drutes.vector = new ol.layer.Vector({
    title: "",
    source: new ol.source.Vector(),
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        }),
        image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
                color: 'red'
            })
        })
    })
});
Drutes.map.addLayer(Drutes.vector);


Drutes.featureOverlay = new ol.FeatureOverlay({
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 4,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
});
Drutes.featureOverlay.setMap(Drutes.map);
