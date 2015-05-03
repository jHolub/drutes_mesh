lineGrid = new Array();
for (i = -100; i < 100; i = i + 10) {
    lineGrid.push(new ol.Feature({
        geometry: new ol.geom.LineString([
            [-100, i],
            [100, i]
        ]
                )
    }));
    lineGrid.push(new ol.Feature({
        geometry: new ol.geom.LineString([
            [i, -100],
            [i, 100]
        ]
                )
    }));
}

Drutes.grid = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: lineGrid
    })
});

lineGridSmall = new Array();
for (i = -100; i < 100; i++) {
    lineGridSmall.push(new ol.Feature({
        geometry: new ol.geom.LineString([
            [-100, i],
            [100, i]
        ]
                )
    }));
    lineGridSmall.push(new ol.Feature({
        geometry: new ol.geom.LineString([
            [i, -100],
            [i, 100]
        ]
                )
    }));
}

Drutes.gridSmall = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: lineGridSmall
    }),
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 255, 0.1)',
            width: 1
        })
    })
});

Drutes.map = new ol.Map({
    renderer: 'canvas',
    target: 'map',
    layers: [Drutes.grid, Drutes.gridSmall],
    controls: ol.control.defaults().extend([new ol.control.ScaleLine({units: 'metric'})]),
    interactions: ol.interaction.defaults({doubleClickZoom: false}),
    view: new ol.View({
        center: [0, 0],
        zoom: 2,
        extent: [-10, -10, 10, 10],
        maxResolution: 0.1,
        resolution: 0.1,
        minZoom: 0,
        maxZoom: 3
    })
});