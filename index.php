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

        <script type="text/javascript" src="./lib/ol2.js"></script>

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
        <div id="tollBar"></div>
        <script>


            Drutes = window.Drutes || {};

            Drutes.dir = "./";

            Drutes.map = new ol.Map({
                target: 'map',
                controls: ol.control.defaults().extend([new ol.control.ScaleLine({units: 'metric'})]),
                interactions: ol.interaction.defaults({doubleClickZoom: false}),
                view: new ol.View({
                    center: [5, 5],
                    extent: [0, 0, 10, 10],
                    maxResolution: 0.1,
                    resolution: 0.1,
                    zoom: 2,
                    minZoom: 0,
                    maxZoom: 3
                })
            });

            Drutes.mousePositionTemplate = 'X: {x}[m] Y: {y}[m]';
            Drutes.map.addControl(new ol.control.MousePosition({
                coordinateFormat: function(coord) {
                    return ol.coordinate.format(coord, Drutes.mousePositionTemplate, 3);
                },
                className: 'custom-mouse-position',
                target: document.getElementById('mousePosition'),
                undefinedHTML: '&nbsp;'
            }));


            Drutes.setVyber = function(data) {


                if (data != "" && data != null) {

                    dat = jQuery.parseJSON(data);

                    for (i = 0; i < dat.length; i++) {

                        format = new ol.format.WKT();

                        feature = format.readFeature(dat[i].geom);
                        feature.setProperties({
                            'id': ""
                        });
                        source = Drutes.vector.getSource();
                        source.addFeature(feature);

                        coor = feature.getGeometry().getCoordinates();

                        //[x,y]
                        a = Drutes.nodes.add(coor[0][0][0], coor[0][0][1]);
                        b = Drutes.nodes.add(coor[0][1][0], coor[0][1][1]);
                        c = Drutes.nodes.add(coor[0][2][0], coor[0][2][1]);
                        Drutes.elements.add(a, b, c);
                    }
                }
                Drutes.printMesh(Drutes.nodes.store, Drutes.elements.store);
            };

            Drutes.drawWKT = function(wkt) {

                format = new ol.format.WKT();
                feature = format.readFeature(wkt);
                source = Drutes.vector.getSource();
                source.addFeature(feature);
                Drutes.map.getView().fitExtent(source.getExtent(), Drutes.map.getSize());
            }



        </script>
        <script src="./js/drawing.js"></script>
        <script src="./js/drawPanel.js"></script>
        <script src="./js/grid.js"></script>  
        <script src="./js/mesh.js"></script> 
        <script src="./js/layers.js"></script>         
        <script>
            Drutes.toolBar(
                    [
                        new Drutes.polygonDraw('Polygon'),
                        new Drutes.pointDraw('Point'),
                        new Drutes.lineDraw('Line'),
                        new Drutes.modifyVector('Select - Modify'),
                        new Drutes.deleteVector('Delete'),
                        new Drutes.makeMesh('Create mesh')
                    ]
                    );

            Drutes.snap = new ol.interaction.Snap({
                source: Drutes.vector.getSource()
            });
            Drutes.map.addInteraction(Drutes.snap);

        </script>
        <script src="css/bootstrap3_3_2/js/bootstrap.min.js"></script>
    </body>

</html>