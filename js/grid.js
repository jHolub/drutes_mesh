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