Drutes.makeCurveProperty = function (depoId) {

    this.depo = depoId;

    this.buttonClass = "btn btn-primary";

    this.buttonSelect = document.createElement('div');

    this.buttonSelect.innerHTML = 'Select curve';

    this.buttonSelect.className = this.buttonClass;

    this.buttonClass = "btn btn-primary";

    this.buttonProperty = document.createElement('div');

    this.buttonProperty.innerHTML = 'Set property';

    this.buttonProperty.className = this.buttonClass;

    var this_ = this;

    this.buttonProperty.onclick = function () {

        this_.selectEvent.getFeatures().forEach(function (feature) {

            property = feature.get('property');
            property[this.inputName.value] = this.inputValue.value;
            Drutes.curveCollect.get(feature.get('idCurve')).property = property;

            curve = Drutes.curveCollect.get(feature.get('idCurve'));
            curve.a.property = property;
            curve.b.property = property;
            console.log(curve);
            this.renderProperty(feature.get('idCurve'), feature.get('property'));
        }, this_);
    };

    this.buttonDelete = document.createElement('div');

    this.buttonDelete.innerHTML = 'Delete property';

    this.buttonDelete.className = this.buttonClass;

    this.buttonDelete.onclick = function () {

        this_.selectEvent.getFeatures().forEach(function (feature) {
            feature.setProperties({property: {}});
            Drutes.curveCollect.get(feature.get('idCurve')).property = {};
            this.renderProperty(feature.get('idCurve'), feature.get('property'));
        }, this_);
    };


    this.renderProperty = function (id, obj) {
        $("#" + this.depo).empty();
        $("#" + this.depo).append("idCurve: " + id + "<br>");
        for (key in obj) {
            $("#" + this.depo).append(key + ": " + obj[key] + "<br>");
        }
    }

    this.dragBox = new ol.interaction.DragBox({
        condition: ol.events.condition.shiftKeyOnly,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: [0, 0, 255, 1]
            })
        })
    });

    this.dragBox.on('boxend', function (e) {
        extent = this_.dragBox.getGeometry().getExtent();
        Drutes.curveLayer.getSource().forEachFeatureIntersectingExtent(extent, function (feature) {
            this_.selectEvent.getFeatures().push(feature);
        });
    });
    
    Drutes.map.addInteraction(this.dragBox);

    this.selectEvent = new ol.interaction.Select({
        layers: [Drutes.curveLayer]
    });
    this.selectEvent.setActive(false);
    Drutes.map.addInteraction(this.selectEvent);

    this.selectEvent.on('select', function (e) {
        e.target.getFeatures().forEach(function (feature) {
            this.renderProperty(feature.get('idCurve'), feature.get('property'));
        }, this_);
    });

    this.activate = function () {
        this.buttonSelect.className = this.buttonClass + " active";
        this.selectEvent.setActive(true);
    }

    this.deactivate = function () {
        this.selectEvent.setActive(false);
        this.selectEvent.getFeatures().clear();
        this.buttonSelect.className = this.buttonClass;
        $("#" + this.depo).empty();
    }

    this.buttonSelect.onclick = function (obj) {
        return function () {
            if (obj.buttonSelect.className == obj.buttonClass) {
                obj.activate();
            } else {
                obj.deactivate();
            }
        }
    }(this)

    this.inputNameLabel = document.createElement('label');
    this.inputNameLabel.innerHTML = "Name: ";
    this.inputName = document.createElement('input');
    this.inputName.type = "text";
    this.inputName.placeholder = "name of property";

    this.inputValueLabel = document.createElement('label');
    this.inputValueLabel.innerHTML = "Value: ";
    this.inputValue = document.createElement('input');
    this.inputValue.type = "number";
    this.inputValue.placeholder = "value";

    var wrapper = document.createElement('fieldset');
    wrapperLegend = document.createElement('legend');
    wrapperLegend.innerHTML = "Create path: ";
    wrapper.appendChild(wrapperLegend);

    this.container = document.createElement('fieldset');
    wrapperLegend = document.createElement('legend');
    wrapperLegend.innerHTML = "Set curve property: ";
    this.container.appendChild(wrapperLegend);


    wrapInputName = document.createElement('div');
    wrapInputName.className = "form-group";
    wrapInputName.appendChild(this.inputNameLabel);
    wrapInputName.appendChild(this.inputName);
    this.container.appendChild(wrapInputName);

    wrapInputValue = document.createElement('div');
    wrapInputValue.className = "form-group";
    wrapInputValue.appendChild(this.inputValueLabel);
    wrapInputValue.appendChild(this.inputValue);
    this.container.appendChild(wrapInputValue);
    this.container.appendChild(this.buttonSelect);
    this.container.appendChild(this.buttonProperty);
    this.container.appendChild(this.buttonDelete);
    info = document.createElement('div');
    info.innerHTML = "Hold shift key for multiple select (click or drag).";
    this.container.appendChild(info);

    this.renderTo = function (id) {

        document.getElementById(id).appendChild(this.container);
    }
}

Drutes.makePathProperty = function (depoId) {

    this.depo = depoId;

    this.buttonClass = "btn btn-primary";

    this.buttonSelect = document.createElement('div');

    this.buttonSelect.innerHTML = 'Select path';

    this.buttonSelect.className = this.buttonClass;

    this.buttonClass = "btn btn-primary";

    this.buttonProperty = document.createElement('div');

    this.buttonProperty.innerHTML = 'Set property';

    this.buttonProperty.className = this.buttonClass;

    var this_ = this;

    this.buttonProperty.onclick = function () {

        this_.selectEvent.getFeatures().forEach(function (feature) {

            property = feature.get('property');
            property[this.inputName.value] = this.inputValue.value;
            Drutes.pathCollect.get(feature.get('idPath')).property = property;

            this.renderProperty(feature.get('idPath'), feature.get('property'));
        }, this_);
    };

    this.buttonDelete = document.createElement('div');

    this.buttonDelete.innerHTML = 'Delete property';

    this.buttonDelete.className = this.buttonClass;

    this.buttonDelete.onclick = function () {

        this_.selectEvent.getFeatures().forEach(function (feature) {
            feature.setProperties({property: {}});
            Drutes.pathCollect.get(feature.get('idPath')).property = {};
            this.renderProperty(feature.get('idPath'), feature.get('property'));
        }, this_);
    };

    this.renderProperty = function (id, obj) {

        $("#" + this.depo).empty();
        $("#" + this.depo).append("idPath: " + id + "<br>");
        for (key in obj) {
            $("#" + this.depo).append(key + ": " + obj[key] + "<br>");
        }
    }

    this.selectEvent = new ol.interaction.Select({layers: [Drutes.pathLayer]});
    this.selectEvent.setActive(false);
    Drutes.map.addInteraction(this.selectEvent);

    this.selectEvent.on('select', function (e) {
        e.target.getFeatures().forEach(function (feature) {

            this.renderProperty(feature.get('idPath'), feature.get('property'));
        }, this_);
    });

    this.activate = function () {
        this.buttonSelect.className = this.buttonClass + " active";
        this.selectEvent.setActive(true);
    }

    this.deactivate = function () {
        this.selectEvent.setActive(false);
        this.selectEvent.getFeatures().clear();
        this.buttonSelect.className = this.buttonClass;
        $("#" + this.depo).empty();
    }

    this.buttonSelect.onclick = function (obj) {
        return function () {
            if (obj.buttonSelect.className == obj.buttonClass) {
                obj.activate();
            } else {
                obj.deactivate();
            }
        }
    }(this)

    this.inputNameLabel = document.createElement('label');
    this.inputNameLabel.innerHTML = "Name: ";
    this.inputName = document.createElement('input');
    this.inputName.type = "text";
    this.inputName.placeholder = "name of property";

    this.inputValueLabel = document.createElement('label');
    this.inputValueLabel.innerHTML = "Value: ";
    this.inputValue = document.createElement('input');
    this.inputValue.type = "number";
    this.inputValue.placeholder = "value";


    var wrapper = document.createElement('fieldset');
    wrapperLegend = document.createElement('legend');
    wrapperLegend.innerHTML = "Create path: ";
    wrapper.appendChild(wrapperLegend);

    this.container = document.createElement('fieldset');
    wrapperLegend = document.createElement('legend');
    wrapperLegend.innerHTML = "Set path property: ";
    this.container.appendChild(wrapperLegend);
    ;


    wrapInputName = document.createElement('div');
    wrapInputName.className = "form-group";
    wrapInputName.appendChild(this.inputNameLabel);
    wrapInputName.appendChild(this.inputName);
    this.container.appendChild(wrapInputName);

    wrapInputValue = document.createElement('div');
    wrapInputValue.className = "form-group";
    wrapInputValue.appendChild(this.inputValueLabel);
    wrapInputValue.appendChild(this.inputValue);
    this.container.appendChild(wrapInputValue);
    this.container.appendChild(this.buttonSelect);
    this.container.appendChild(this.buttonProperty);
    this.container.appendChild(this.buttonDelete);

    this.renderTo = function (id) {

        document.getElementById(id).appendChild(this.container);
    }
}