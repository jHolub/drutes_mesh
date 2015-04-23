            Drutes.grid = new ol.layer.Vector({
                source: new ol.source.Vector()
            });
            Drutes.map.addLayer(Drutes.grid);

            Drutes.createGrid = function() {
//[x,y]
                for (i = -100; i < 100; i = i + 10) {
                    pointX = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            [-100, i],
                            [100, i]
                        ]
                                )
                    });
                    pointY = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            [i, -100],
                            [i, 100]
                        ]
                                )
                    });
                    Drutes.grid.getSource().addFeature(pointX);
                    Drutes.grid.getSource().addFeature(pointY);
                }
            }();
            
            Drutes.gridSmall = new ol.layer.Vector({
                source: new ol.source.Vector(),
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
            Drutes.map.addLayer(Drutes.gridSmall);

            Drutes.createGridSmall = function() {
//[x,y]
                for (i = -100; i < 100; i++) {
                    pointX = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            [-100, i],
                            [100, i]
                        ]
                                )
                    });
                    pointY = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            [i, -100],
                            [i, 100]
                        ]
                                )
                    });
                    Drutes.gridSmall.getSource().addFeature(pointX);
                    Drutes.gridSmall.getSource().addFeature(pointY);
                }
            }();            