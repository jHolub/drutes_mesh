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
        //source: Drutes.vector.getSource(),    for snapping
        features: Drutes.featureOverlay.getFeatures(),
        type: "Polygon"
    });

    this.control.setActive(false);

    Drutes.map.addInteraction(this.control);

    this.control.on('drawend', function(e) {
        /*  geometry = e.feature.getGeometry();
         extend = geometry.getExtent();
         coord = geometry.getCoordinates();
         
         domain = Drutes.createDomain(coord[0], extend);
         Drutes.createMesh(domain, coord[0], extend);
         
         Drutes.featureOverlay.getFeatures().clear();
         */
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

Drutes.lineDraw = function(label) {

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
        //source: Drutes.vector.getSource(),    for snapping
        features: Drutes.featureOverlay.getFeatures(),
        type: "LineString"
    });

    this.control.setActive(false);

    Drutes.map.addInteraction(this.control);

    this.control.on('drawend', function(e) {

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

Drutes.pointDraw = function(label) {

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
        //source: Drutes.vector.getSource(),    for snapping
        features: Drutes.featureOverlay.getFeatures(),
        type: "Point"
    });

    this.control.setActive(false);

    Drutes.map.addInteraction(this.control);

    this.control.on('drawend', function(e) {

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


Drutes.selectVector = function() {

    this.button;

    this.buttonClass = "btn btn-primary btn-block";

    this.label = "Select feature";

    this.button = document.createElement('div');

    this.button.innerHTML = this.label;

    this.button.id = this.id;

    this.button.className = this.buttonClass;

    this.button.title = this.label;

    this.control = new ol.interaction.Select({});

    Drutes.map.addInteraction(this.control);

    this.activate = function() {
        this.button.className = this.buttonClass + " active";
        this.button.innerHTML = "Unselect feature";
        this.active = true;
        this.control.setActive(true);
    }

    this.deactivate = function() {
        this.control.setActive(false);
        this.button.innerHTML = "Select feature";
        this.control.getFeatures().clear();
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
};

Drutes.modifyVector = function(label, selector) {

    this.button;

    this.buttonClass = "btn btn-primary btn-block";

    this.label = label;

    this.button = document.createElement('div');

    this.button.innerHTML = this.label;

    this.button.id = this.id;

    this.button.className = this.buttonClass;

    this.button.title = label;

    this.control = new ol.interaction.Select({});

    this.modify = new ol.interaction.Modify({
        features: selector.getFeatures()
    });
    Drutes.map.addInteraction(this.modify);

    this.activate = function() {
        this.button.className = this.buttonClass + " active";
        this.active = true;
        this.modify.setActive(true);
    }

    this.deactivate = function() {
        this.modify.setActive(false);
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

Drutes.deleteVector = function(label) {

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

            Drutes.featureOverlay.removeFeature(feature);
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

    this.layer = Drutes.featureOverlay;

    this.coord = new Array();
    
    this.feature = null;

    this.inputX = document.createElement('input');

    this.inputY = document.createElement('input');

    var this_ = this;

    addBtn = document.createElement('div');
    addBtn.className = "btn btn-primary";
    addBtn.innerHTML = "add";
    addBtn.onclick = function() {
        
        this_.coord.push([this_.inputX.value, this_.inputY.value]);
        this_.sketch();
    };

    endBtn = document.createElement('div');
    endBtn.className = "btn btn-primary";
    endBtn.innerHTML = "end";
    endBtn.onclick = function() {
        
        this_.coord = new Array();
        this_.feature = null;
    };

    this.sketch = function() {

        if(this.feature != null) Drutes.featureOverlay.removeFeature(this.feature);
        
        this.feature = new ol.Feature({
            geometry: new ol.geom.LineString(this.coord)
        });
        Drutes.featureOverlay.addFeature(this.feature);
    }

    var wrapper = document.createElement('div');
    wrapper.appendChild(this.inputX);
    wrapper.appendChild(this.inputY);
    wrapper.appendChild(addBtn);
    wrapper.appendChild(endBtn);

    this.render = function(id) {

        document.getElementById(id).appendChild(wrapper);
    }
}

