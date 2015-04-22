<!DOCTYPE html>
<html>
    <head>        
        <meta charset="UTF-8">
        <meta name="author" content="JH" />
        <meta name="project" content="drutes" />
        <meta name="language" content="czech" />
        <meta name="country" content="cz" />
        <meta http-equiv="content-language" content="cs" />

        <link rel="stylesheet" href="./js/OL_3.4.0/css/ol.css" type="text/javascript">

        <script src="./js/OL_3.4.0/build/ol.js" type="text/javascript"></script>

        <script src="http://cdnjs.cloudflare.com/ajax/libs/proj4js/2.2.1/proj4.js" type="text/javascript"></script>

        <script src="./js/jquery/jquery-1.11.1.min.js"></script>
    </head>

    <body>  
        <h1>MESH DRUTES</h1>
        <div id="map" class="map" style="width: 700px; height: 400px; border: red solid 1px;"></div>
        <div id="mousePosition"></div>

        <script>


            Drutes = window.Drutes || {};

            Drutes.dir = "./";

            Drutes.map = new ol.Map({
                target: 'map',
                controls: ol.control.defaults().extend([new ol.control.ScaleLine({units: 'metric'})]),
                view: new ol.View({
                    center: [0, 0],
                    maxResolution: 1,
                    resolution: 1
                })
            });

            Drutes.map.addControl(new ol.control.ZoomSlider());
            Drutes.map.addControl(new ol.control.MousePosition({
                className: 'custom-mouse-position',
                target: document.getElementById('mousePosition'),
                undefinedHTML: '&nbsp;'
            }));

            Drutes.vector = new ol.layer.Vector({
                title: "Vybrané území",
                source: new ol.source.Vector(),
                style: function(feature, resolution) {

                    text = resolution < 20 ? feature.get('id') : '';

                    style = [new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: 'rgba(255, 255, 255, 0.2)'
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#ffcc33',
                                width: 2
                            }),
                            text: new ol.style.Text({
                                font: '12px Calibri,sans-serif',
                                text: text,
                                fill: new ol.style.Fill({
                                    color: '#000'
                                }),
                                stroke: new ol.style.Stroke({
                                    color: '#fff',
                                    width: 3
                                })
                            })
                        })];
                    return style;
                }
            });
            Drutes.map.addLayer(Drutes.vector);


            Drutes.featureOverlay = new ol.FeatureOverlay({
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffcc33'
                        })
                    })
                })
            });
            Drutes.featureOverlay.setMap(Drutes.map);


            Drutes.collection = new function() {

                this.store = new Array();

                this.add = function(value) {

                    if (!this.isIn(value)) {
                        this.store.push(value);
                    }
                };

                this.remove = function(value) {
                };

                this.isIn = function(value) {
                    for (var i = 0; i < this.store.length; i++) {
                        if (this.store[i] === value) {
                            return true;
                        }
                    }
                    return false;
                };
            }();

            Drutes.nodes = new function() {

                this.store = new Array();

                this.index = 0;

                this.add = function(x, y) {

                    if (!this.isIn(x, y)) {
                        this.store[this.index] = new Array(x, y);
                        this.index++;
                        return (this.index - 1)
                    } else {

                        return this.getIndex(x, y);
                        ;
                    }
                };

                this.remove = function(value) {
                };

                this.isIn = function(x, y) {
                    for (var i = 0; i < this.store.length; i++) {
                        if (this.store[i][0] === x && this.store[i][1] === y) {
                            return true;
                        }
                    }
                    return false;
                };

                this.getIndex = function(x, y) {
                    for (var i = 0; i < this.store.length; i++) {
                        if (this.store[i][0] === x && this.store[i][1] === y) {
                            return i;
                        }
                    }
                }
            }();

            Drutes.elements = new function() {

                this.store = new Array();

                this.add = function(a, b, c) {

                    this.store.push(new Array(a, b, c));
                }

            }();


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
                Drutes.printMesh(Drutes.nodes.store,Drutes.elements.store);
            };
            
            Drutes.printMesh = function(nodes, elements){
                
                table = "";
                for (i = 0; i < nodes.length; i++) {
                    
                    table = table + "<tr><td>" + i + ".index </td><td> X : " + nodes[i][0] + "</td><td> Y: " + nodes[i][1] + "</td></tr>";
                }
                $("body").append("<table>" + table + "</table>");
                
                 table = "";
                for (i = 0; i < elements.length; i++) {
                    
                    table = table + "<tr><td>" + i + ".element </td><td> A : " + elements[i][0] + "</td><td> B: " + elements[i][1] + "</td><td> C: " + elements[i][2] + "</td></tr>";
                }
                $("body").append("<table>" + table + "</table>");
            }



            Drutes.polygonPicker = function(label) {

                this.button;

                this.buttonClass = "ControlPolygonPicker btn btn-primary";

                this.id = "ControlPolygonPicker";

                this.label = label;

                this.button = document.createElement('div');

                this.button.innerHTML = this.label;

                this.button.className = this.buttonClass;

                this.button.id = this.id;

                this.button.title = "Výběr polygonem";

                this.control = new ol.interaction.Draw({
                    features: Drutes.featureOverlay.getFeatures(),
                    type: "Polygon"
                });

                this.control.on('drawend', function(e) {

                    geometry = e.feature.getGeometry();
                    coord = geometry.getCoordinates();
                    wkt = new ol.format.WKT();
                    wktStr = wkt.writeFeature(e.feature);

                    //url = Kalkulacka.dir + "query/pokGrid.php?coor=" + wktStr;
                    url = Drutes.dir + "query/pok.php?coor=" + wktStr;
                    $.ajax({
                        url: url,
                    }).done(function(data) {

                        Drutes.setVyber(data);
                    });

                    Drutes.featureOverlay.getFeatures().clear();
                });

                this.control.setActive(false);

                Drutes.map.addInteraction(this.control);

                this.activate = function() {
                    this.button.className = this.buttonClass + " activeButton";
                    this.control.setActive(true);
                }

                this.deactivate = function() {
                    this.control.setActive(false);
                    this.button.className = this.buttonClass;
                }

                this.button.onclick = function(obj) {
                    return function() {
                        if (obj.button.className == obj.buttonClass) {
                            obj.activate();
                        } else {
                            obj.deactivate();
                        }
                    }
                }(this)

                this.render = function() {

                    return this.button;
                }
            };

            but = new Drutes.polygonPicker('Polyogon');
            $("body").append(but.render());


        </script>



    </body>

</html>