<!DOCTYPE html>
<html>
    <head>        
        <meta charset="UTF-8">
        <meta name="author" content="JH" />
        <meta name="project" content="drutes" />
        <meta name="language" content="czech" />
        <meta name="country" content="cz" />
        <meta http-equiv="content-language" content="cs" />

        <link rel="stylesheet" href="./lib/OL_3.4.0/css/ol.css" type="text/javascript">

        <link rel="stylesheet" href="./lib/bootstrap3_3_2/css/bootstrap.min.css">

        <script src="./lib/ol3/build/ol.js" type="text/javascript"></script>

        <script src="http://cdnjs.cloudflare.com/ajax/libs/proj4js/2.2.1/proj4.js" type="text/javascript"></script>

        <script src="./lib/jquery/jquery-1.11.1.min.js"></script>

        <script type="text/javascript" src="./lib/jsts/jsts/lib/javascript.util.js"></script>

        <script type="text/javascript" src="./lib/jsts/jsts/lib/jsts.js"></script>

        <style>

            body{
                margin: 0px;
                padding: 0px;
            }

            #map{
                width: 100%; 
                height: 500px; 
                background-color: gray;
            }
        </style>

    </head>

    <body>  
        <div id="map" class="map"></div>
        <div id="mousePosition"></div>
        <div id="info"></div>
        <div id="tollBar"></div>
        <div class="form-group">
            <label for="density">Mesh density [0.1m - 5m]:</label>
            <input type="number" value="0.7" class="form-control" id="density">
        </div>
        <div class="form-group">
            <label for="cloudPoint">Number of cloud point [500 - 10 000]:</label>
            <input type="number" value="5000" class="form-control" id="cloudPoint">
        </div>     
        <script>

            Drutes = window.Drutes || {};
            Drutes.dir = "./";

        </script>
        <script src="./js/grid.js"></script>         
        <script>



            Drutes.mousePositionTemplate = 'X: {x}[m] Y: {y}[m]';
            Drutes.map.addControl(new ol.control.MousePosition({
                coordinateFormat: function(coord) {
                    return ol.coordinate.format(coord, Drutes.mousePositionTemplate, 3);
                },
                className: 'custom-mouse-position',
                target: document.getElementById('mousePosition'),
                undefinedHTML: '&nbsp;'
            }));

            Drutes.drawWKT = function(wkt) {

                format = new ol.format.WKT();
                feature = format.readFeature(wkt);
                polygons = feature.getGeometry().getGeometries();
                source = Drutes.vector.getSource();
// from geometry collection to simplegeometry                
                for (i = 0; i < polygons.length; i++) {
                    console.log("rendering" + ( i / polygons.length ) );
                    poly = new ol.Feature({
                        geometry: polygons[i]
                    });
                    source.addFeature(poly);
                    coor = polygons[i].getCoordinates();
                        //[x,y]
                        a = Drutes.nodes.add(coor[0][0][0], coor[0][0][1]);
                        b = Drutes.nodes.add(coor[0][1][0], coor[0][1][1]);
                        c = Drutes.nodes.add(coor[0][2][0], coor[0][2][1]);
                        Drutes.elements.add(a, b, c);                    
                }
                Drutes.printMesh(Drutes.nodes.store, Drutes.elements.store);
            }
        </script>
        <script src="./js/drawing.js"></script>
        <script src="./js/drawPanel.js"></script>

        <script>Drutes.selector = new Drutes.selectVector('Select');</script>

        <script src="./js/mesh.js"></script> 
        <script src="./js/layers.js"></script>         
        <script>


            Drutes.toolBar(
                    [
                        new Drutes.polygonDraw('Draw shape'),
                        Drutes.selector,
                        new Drutes.deleteVector('Delete selected feature')
                    ],
                    [
                        new Drutes.modifyVector('Modify feature', Drutes.selector.control)
                    ],
                    [
                        new Drutes.makeMesh('make mesh')
                    ]
                    );

            Drutes.snap = new ol.interaction.Snap({
                features: Drutes.featureOverlay.getFeatures()
            });
            Drutes.map.addInteraction(Drutes.snap);
        </script>
    </body>

</html>