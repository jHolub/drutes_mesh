<!DOCTYPE html>
<html>
    <head>        
        <meta charset="UTF-8">
        <meta name="author" content="JH" />
        <meta name="project" content="drutes" />
        <meta name="language" content="czech" />
        <meta name="country" content="cz" />
        <meta http-equiv="content-language" content="cs" />

        <link rel="stylesheet" href="./lib/OL_3.6.0/css/ol.css" type="text/javascript">

        <link rel="stylesheet" href="./lib/bootstrap3_3_2/css/bootstrap.min.css">

        <script src="./lib/OL_3.6.0/build/ol.js" type="text/javascript"></script>

        <script src="http://cdnjs.cloudflare.com/ajax/libs/proj4js/2.2.1/proj4.js" type="text/javascript"></script>

        <script src="./lib/jquery/jquery-1.11.1.min.js"></script>

        <style>

            body{
                margin: 0px;
                padding: 0px;
                width: 100%; 
                height: 100%;                 
            }

            #map{
                width: 100%; 
                height: 100%; 
                background-color: black;
            }
        </style>

    </head>

    <body>  
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div id="naviCont" class="inline">

                </div>
            </div>
        </nav>
        <div class="row">                
            <div class="col-md-9"> 




                <div id="map" class="map"></div>
                <div id="mousePosition"></div>
            </div>                
            <div class="col-md-3">                    
                <div id="info"></div>
                <div id="tollBar"></div>
                <div id="creator"></div>
                <div id="editProperty"></div>
                <div id="selectedFeature"></div>
            </div>                
        </div>
        <div>Use Alt+Shift+drag to rotate</div>
        <div id="import"></div>
        <div id="configResult"></div>

        <script>

            Drutes = window.Drutes || {};
            Drutes.dir = "./";

        </script>
        <script src="./js/grid.js"></script>  
        <script src="./js/canvas.js"></script> 
        <script src="./js/layers.js"></script> 
        <script src="./js/drawPanel.js"></script>      
        <script src="./js/meshConfig.js"></script>     
        <script src="./js/naviPanel.js"></script>    
        <script src="./js/import.js"></script> 
        <script src="./js/vectorObj.js"></script> 
        <script>
            $(document).ready(function() {
                Drutes.toolBar(
                        [
                            new Drutes.polygonDraw('Draw path'),
                            new Drutes.deletePath('Delete path')
                        ]
                        );

                Drutes.snap = new ol.interaction.Snap({
                    source: Drutes.pathLayer.getSource()
                });
                Drutes.map.addInteraction(Drutes.snap);

                new Drutes.createPath().render('creator');
                new Drutes.makePathProperty('selectedFeature').renderTo('editProperty');
                new Drutes.makeCurveProperty('selectedFeature').renderTo('editProperty');

                new Drutes.makeConfigMesh('config maker').renderTo('naviCont');
                new Drutes.saveFeatures('Save features as:').renderTo('naviCont');
                new Drutes.loadFeatures('Load features').renderTo('naviCont');
                new Drutes.importComp().renderTo('import');
            });
        </script>
    </body>

</html>