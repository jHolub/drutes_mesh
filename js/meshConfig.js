Drutes.curveColection = new function() {

    this.curve = new Array();

    this.property = new Array();

    this.index = 0;

    this.add = function(vertex1, vertex2, property) {

        if (!this.isIn(vertex1, vertex2)) {
            this.curve[this.index] = new Array(vertex1, vertex2);
            this.setProperty(property);

            this.index++;
            return (this.index - 1)
        } else {

            cloneId = this.getIndex(vertex1, vertex2);
// krivka tvori hranici pro dve oblasti 
            this.property[cloneId].idPath = [this.property[cloneId].idPath, property.idPath];

            return cloneId;
        }
    };

    this.setProperty = function(property) {

        this.property[this.index] = property;
    }

    this.clean = function() {

        this.curve = new Array();
    };

    this.isIn = function(vertex1, vertex2) {
        for (var i = 0; i < this.curve.length; i++) {
            if (
                    (this.curve[i][0] === vertex1 && this.curve[i][1] === vertex2)
                    ||
                    (this.curve[i][1] === vertex1 && this.curve[i][0] === vertex2)
                    ) {
                return true;
            }
        }
        return false;
    };

    this.getIndex = function(vertex1, vertex2) {
        for (var i = 0; i < this.curve.length; i++) {
            if (
                    (this.curve[i][0] === vertex1 && this.curve[i][1] === vertex2)
                    ||
                    (this.curve[i][1] === vertex1 && this.curve[i][0] === vertex2)
                    ) {
                return i;
            }
        }
    };

}();

Drutes.vertexColection = new function() {

    this.vertex = new Array();

    this.index = 0;

    this.property = new Array();

    this.add = function(x, y, property) {

        if (!this.isIn(x, y)) {
            this.vertex[this.index] = new Array(x, y);
            this.setProperty(property);

            this.index++;
            return (this.index - 1)
        } else {

            return this.getIndex(x, y);
        }
    };

    this.setProperty = function(property) {

        this.property[this.index] = property;
    };

    this.clean = function() {

        this.vertex = new Array();
    };

    this.isIn = function(x, y) {
        for (var i = 0; i < this.vertex.length; i++) {
            if (this.vertex[i][0] === x && this.vertex[i][1] === y) {
                return true;
            }
        }
        return false;
    };

    this.getIndex = function(x, y) {
        for (var i = 0; i < this.vertex.length; i++) {
            if (this.vertex[i][0] === x && this.vertex[i][1] === y) {
                return i;
            }
        }
    };

}();


Drutes.pathColection = new function() {


    this.index = 0;

    this.add = function() {

        this.index++;
    };

    this.getIndex = function() {

        return this.index;
    };

    this.clean = function() {


    };

}();

Drutes.makeCurveProperty = function(depoId) {

    this.depo = depoId;

    this.buttonClass = "btn btn-primary";

    this.buttonSelect = document.createElement('div');

    this.buttonSelect.innerHTML = 'Select curve';

    this.buttonSelect.className = this.buttonClass;

    this.buttonClass = "btn btn-primary";

    this.button = document.createElement('div');

    this.button.innerHTML = 'Set property';

    this.button.className = this.buttonClass;

    var this_ = this;

    this.button.onclick = function() {

        this_.selectEvent.getFeatures().forEach(function(feature) {

            property = feature.get('property');
            property[this.inputName.value] = this.inputValue.value;
            this.renderProperty(feature.get('idPath'), feature.get('property'));
        }, this_);
    };

    this.renderProperty = function(id, obj) {
        
        $("#" + this.depo).empty();
        $("#" + this.depo).append("idCurve: " + id + "<br>");
        for (key in obj) {
            $("#" + this.depo).append(key + ": " + obj[key] + "<br>");
        }
    }

    this.selectEvent = new ol.interaction.Select({layers: [Drutes.curveLayer]});
    this.selectEvent.setActive(false);
    Drutes.map.addInteraction(this.selectEvent);

    this.selectEvent.on('select', function(e) {
        e.target.getFeatures().forEach(function(feature) {

            this.renderProperty(feature.get('idPath'), feature.get('property'));
        }, this_);
    });

    this.activate = function() {
        this.buttonSelect.className = this.buttonClass + " active";
        this.selectEvent.setActive(true);
    }

    this.deactivate = function() {
        this.selectEvent.setActive(false);
        this.selectEvent.getFeatures().clear();
        this.buttonSelect.className = this.buttonClass;
        $("#" + this.depo).empty();
    }

    this.buttonSelect.onclick = function(obj) {
        return function() {
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
    this.container.appendChild(wrapperLegend);;


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
    this.container.appendChild(this.button);

    this.renderTo = function(id) {

        document.getElementById(id).appendChild(this.container);
    }
}

Drutes.makePathProperty = function(depoId) {

    this.depo = depoId;

    this.buttonClass = "btn btn-primary";

    this.buttonSelect = document.createElement('div');

    this.buttonSelect.innerHTML = 'Select path';

    this.buttonSelect.className = this.buttonClass;

    this.buttonClass = "btn btn-primary";

    this.button = document.createElement('div');

    this.button.innerHTML = 'Set property';

    this.button.className = this.buttonClass;

    var this_ = this;

    this.button.onclick = function() {

        this_.selectEvent.getFeatures().forEach(function(feature) {

            property = feature.get('property');
            property[this.inputName.value] = this.inputValue.value;
            this.renderProperty(feature.get('idPath'), feature.get('property'));
        }, this_);
    };

    this.renderProperty = function(id, obj) {
        
        $("#" + this.depo).empty();
        $("#" + this.depo).append("idPath: " + id + "<br>");
        for (key in obj) {
            $("#" + this.depo).append(key + ": " + obj[key] + "<br>");
        }
    }

    this.selectEvent = new ol.interaction.Select({layers: [Drutes.pathLayer]});
    this.selectEvent.setActive(false);
    Drutes.map.addInteraction(this.selectEvent);

    this.selectEvent.on('select', function(e) {
        e.target.getFeatures().forEach(function(feature) {

            this.renderProperty(feature.get('idPath'), feature.get('property'));
        }, this_);
    });

    this.activate = function() {
        this.buttonSelect.className = this.buttonClass + " active";
        this.selectEvent.setActive(true);
    }

    this.deactivate = function() {
        this.selectEvent.setActive(false);
        this.selectEvent.getFeatures().clear();
        this.buttonSelect.className = this.buttonClass;
        $("#" + this.depo).empty();
    }

    this.buttonSelect.onclick = function(obj) {
        return function() {
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
    this.container.appendChild(wrapperLegend);;


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
    this.container.appendChild(this.button);

    this.renderTo = function(id) {

        document.getElementById(id).appendChild(this.container);
    }
}