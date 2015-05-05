lineGrid = new Array();
for (i = -200; i < 200; i = i + 10) {
    lineGrid.push(new ol.Feature({
        geometry: new ol.geom.LineString([
            [-200, i],
            [200, i]
        ]
                )
    }));
    lineGrid.push(new ol.Feature({
        geometry: new ol.geom.LineString([
            [i, -200],
            [i, 200]
        ]
                )
    }));
}

Drutes.grid = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: lineGrid
    }),
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

lineGridSmall = new Array();
for (i = -200; i < 200; i++) {
    lineGridSmall.push(new ol.Feature({
        geometry: new ol.geom.LineString([
            [-200, i],
            [200, i]
        ]
                )
    }));
    lineGridSmall.push(new ol.Feature({
        geometry: new ol.geom.LineString([
            [i, -200],
            [i, 200]
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
    layers: [Drutes.grid],
    controls: ol.control.defaults().extend([new ol.control.ScaleLine({units: 'metric'})]),
    interactions: ol.interaction.defaults({doubleClickZoom: false}),
    view: new ol.View({
        center: [0, 0],
        zoom: 21,
        extent: [-100, -100, 100, 100],
        minZoom: 20,
        maxZoom: 24
    })
});