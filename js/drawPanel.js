
Drutes.polygonDraw = function(label) {

    this.button;

    this.buttonClass = "btn btn-primary btn-block";

    this.id = "ControlPolygon";

    this.label = label;

    this.button = document.createElement('div');

    this.button.innerHTML = this.label;

    this.button.className = this.buttonClass;

    this.button.id = this.id;

    this.button.title = "Výběr polygonem";

    this.control = new ol.interaction.Draw({
        source: Drutes.pathLayer.getSource(),
        type: "Polygon"
    });

    this.control.setActive(false);

    Drutes.map.addInteraction(this.control);

    this.control.on('drawend', function(e) {

        Drutes.addPath(e.feature);
    });

    this.activate = function() {
        this.button.className = this.buttonClass + " active";
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

Drutes.deletePath = function(label) {

    this.button;

    this.buttonClass = "btn btn-primary btn-block";

    this.label = label;

    this.button = document.createElement('div');

    this.button.innerHTML = this.label;

    this.button.id = this.id;

    this.button.className = this.buttonClass;

    this.button.title = label;

    this.control = function(e) {
        Drutes.map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {

            Drutes.curveLayer.getSource().forEachFeature(function(e) {
                if (e.get('idPath') == this.get('idPath')) {
                    Drutes.curveLayer.getSource().removeFeature(e);
                }
            }, feature);

            Drutes.pathLayer.getSource().removeFeature(feature);

        });
    }

    this.activate = function() {
        this.button.className = this.buttonClass + " active";
        this.active = true;
        Drutes.map.on("click", this.control);
    }

    this.deactivate = function() {
        Drutes.map.un("click", this.control);
        this.button.className = this.buttonClass;
        this.active = false;
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

    this.isActive = function() {

        return this.active;
    }

    this.render = function() {

        return this.button;
    }
}


Drutes.createPath = function() {

    this.layer = Drutes.sketchLayer.getSource();

    this.coord = new Array();

    this.feature = null;
    this.inputXLabel = document.createElement('label');
    this.inputXLabel.innerHTML = " Coordinates X: ";
    this.inputX = document.createElement('input');
    this.inputX.placeholder = 'X coor.';

    this.inputYLabel = document.createElement('label');
    this.inputYLabel.innerHTML = "Coordinates Y: ";
    this.inputY = document.createElement('input');
    this.inputY.placeholder = 'Y coor.';

    var this_ = this;

    addBtn = document.createElement('div');
    addBtn.className = "btn btn-primary";
    addBtn.innerHTML = "Add vertex";
    addBtn.onclick = function() {

        this_.coord.push([this_.inputX.value, this_.inputY.value]);
        this_.sketch();
    };

    endBtn = document.createElement('div');
    endBtn.className = "btn btn-primary";
    endBtn.innerHTML = "Close";
    endBtn.onclick = function() {

        this_.layer.clear();
        Drutes.addPath(this_.feature);
        Drutes.pathLayer.getSource().addFeature(this_.feature);
        this_.coord = new Array();
        this_.feature = null;
    };

    this.sketch = function() {

        if (this.feature != null)
            this.layer.removeFeature(this.feature);

        if (this.coord.length == 1) {
            geom = new ol.geom.Point(this.coord[0]);
        } else if (this.coord.length == 2) {
            geom = new ol.geom.LineString(this.coord);
        } else {
            coord = new Array();
            for (i = 0; i < this.coord.length; i++) {
                coord.push(this.coord[i]);
            }
            coord.push(this.coord[0]);
            geom = new ol.geom.Polygon([coord]);
        }
        ;

        this.feature = new ol.Feature({
            geometry: geom
        });
        this.layer.addFeature(this.feature);
    }

    var wrapper = document.createElement('fieldset');
    wrapperLegend = document.createElement('legend');
    wrapperLegend.innerHTML = "Create path: ";
    wrapper.appendChild(wrapperLegend);

    wrapInputX = document.createElement('div');
    wrapInputX.className = "form-group";
    wrapInputX.appendChild(this.inputXLabel);
    wrapInputX.appendChild(this.inputX);
    wrapper.appendChild(wrapInputX);

    wrapInputY = document.createElement('div');
    wrapInputY.className = "form-group";
    wrapInputY.appendChild(this.inputYLabel);
    wrapInputY.appendChild(this.inputY);
    wrapper.appendChild(wrapInputY);

    wrapper.appendChild(addBtn);
    wrapper.appendChild(endBtn);

    this.render = function(id) {

        document.getElementById(id).appendChild(wrapper);
    }
}

Drutes.addPath = function(path) {
/*
    coord = path.getGeometry().getCoordinates();
    Drutes.pathColection.add();
    path.setProperties({idPath: Drutes.pathColection.getIndex(), property: {}});

    for (i = 0; i < (coord[0].length - 1); i++) {

        geom = new ol.geom.LineString([coord[0][i], coord[0][i + 1]]);
        feature = new ol.Feature({geometry: geom});
        feature.setProperties({
            idPath: Drutes.pathColection.getIndex(),
            property: {}
        });
        Drutes.curveLayer.getSource().addFeature(feature);

        vertexCoord = feature.getGeometry().getCoordinates();
        Drutes.curveColection.add(
                Drutes.vertexColection.add(vertexCoord[0][0], vertexCoord[0][1], feature.get('property')),
                Drutes.vertexColection.add(vertexCoord[1][0], vertexCoord[1][1], feature.get('property')),
                {idPath: feature.get('idPath'), property: feature.get('property')}
        );

    }
*/


    coord = path.getGeometry().getCoordinates();
    curves = new Array();
    
    for (i = 0; i < (coord[0].length - 1); i++) {
        a = new Drutes.vertexObj(coord[0][i][0], coord[0][i][1]);
        b = new Drutes.vertexObj(coord[0][i + 1][0], coord[0][i + 1][1]);
        
        curve = new Drutes.curveObj(a,b);
        curves.push(curve);
        curveGeom = new ol.geom.LineString([coord[0][i], coord[0][i + 1]]);
        curveFeature = new ol.Feature({geometry: curveGeom});
        curveFeature.setProperties({
            idCurve: curve.id,
            property: {}
        });
        Drutes.curveLayer.getSource().addFeature(curveFeature);    
        
    }    
    pathObj = new Drutes.pathObj(curves);
    path.setProperties({idPath: pathObj.id, property: {}});

};

Drutes.toolBar = function() {

    this.component = document.createElement("div");

    this.component.id = "toolBar";

    this.groupControls = new Array();

    this.groupContainer = new Array();

    for (i = 0; i < arguments.length; i++) {

        this.groupControls[i] = arguments[i];

        this.groupContainer[i] = document.createElement("span");
        this.groupContainer[i].className = 'toolGroup';
        this.groupContainer[i].id = 'toolGroup' + i;

        this.groupContainer[i].onclick = function(controls) {
            return  function(event) {
                for (j = 0; j < controls.length; j++) {
// Firefox need this                    
                    if (!event)
                        event = window.event;
// IE target                    
                    targetEvent = event.target ? event.target : event.srcElement;
                    if (targetEvent != controls[j].render()) {
                        if (controls[j].deactivate) {
                            controls[j].deactivate();
                        }
                    }
                }
            }
        }(this.groupControls[i])

        for (j = 0; j < this.groupControls[i].length; j++) {

            this.groupContainer[i].appendChild(this.groupControls[i][j].render());
        }

        this.component.appendChild(this.groupContainer[i]);
    }

    document.getElementById("tollBar").appendChild(this.component);
};