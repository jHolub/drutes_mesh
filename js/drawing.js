Drutes.polygonDraw = function(label) {

    this.button;

    this.buttonClass = "ControlPolygon btn btn-primary";

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

Drutes.selectVector = function(label) {
    
    this.button;

    this.buttonClass = "ControlModify btn btn-primary";

    this.label = label;

    this.button = document.createElement('div');

    this.button.innerHTML = this.label;

    this.button.id = this.id;

    this.button.className = this.buttonClass;

    this.button.title = label;

    this.control = new ol.interaction.Select({});

    Drutes.map.addInteraction(this.control);

    this.activate = function() {
        this.button.className = this.buttonClass + " active";
        this.active = true;
        this.control.setActive(true);
    }

    this.deactivate = function() {
        this.control.setActive(false);
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

    this.buttonClass = "ControlModify btn btn-primary";

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

    this.buttonClass = "ControlModify btn btn-primary";

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

