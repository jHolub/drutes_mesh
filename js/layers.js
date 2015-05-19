Drutes.pathLayer = new ol.layer.Vector({
    title: "Path",
    source: new ol.source.Vector(),
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 255, 0.2)',
            width: 1
        })
    })
});

Drutes.curveLayer = new ol.layer.Vector({
    title: "Path",
    source: new ol.source.Vector(),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 2
        })
    })
});

Drutes.sketchLayer = new ol.layer.Vector({
    title: "sketch",
    source: new ol.source.Vector()
});

Drutes.map.addLayer(Drutes.pathLayer);
Drutes.map.addLayer(Drutes.curveLayer);
Drutes.map.addLayer(Drutes.sketchLayer);
