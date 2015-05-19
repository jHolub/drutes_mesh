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


Drutes.makeProperty = function() {

    this.buttonClass = "btn btn-primary  btn-block";
    

    this.buttonSelect = document.createElement('div');

    this.buttonSelect.innerHTML = 'Select path';

    this.buttonSelect.className = this.buttonClass;
  
    this.buttonClass = "btn btn-primary  btn-block";

    this.button = document.createElement('div');

    this.button.innerHTML = 'Set';

    this.button.className = this.buttonClass;
  
    var this_ = this;
    
    this.button.onclick = function(){
        
        this_.selectEvent.getFeatures().forEach(function(feature){

                feature.setProperties({property: {}});
                //this.inputName.value: this.inputValue.value
                //feature.prototype.property = {name: 'value'};
                console.log(feature);
            }, this_);
    };    
        
   this.selectEvent = new ol.interaction.Select();
   this.selectEvent.setActive(false); 
   Drutes.map.addInteraction(this.selectEvent);

   this.activate = function() {
        this.buttonSelect.className = this.buttonClass + " active";
        this.selectEvent.setActive(true);
    }

    this.deactivate = function() {
        this.selectEvent.setActive(false);
        this.selectEvent.getFeatures().clear();
        this.buttonSelect.className = this.buttonClass;
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


    this.inputName = document.createElement('input');

    this.inputName.type = "text";

    this.inputName.placeholder = "name of property";

    this.inputValue = document.createElement('input');

    this.inputValue.type = "number";

    this.inputValue.placeholder = "value";

    this.container = document.createElement('div');
    this.container.innerHTML = 'Set property: ';
    this.container.appendChild(this.buttonSelect);
    this.container.appendChild(this.inputName);
    this.container.appendChild(this.inputValue);
    this.container.appendChild(this.button);

    this.renderTo = function(id) {

        document.getElementById(id).appendChild(this.container);
    }
}

Drutes.makeConfigMesh = function(label) {

    this.button;

    this.buttonClass = "btn btn-primary  btn-block";

    this.label = label;

    this.button = document.createElement('div');

    this.button.innerHTML = this.label;

    this.button.id = this.id;

    this.button.className = this.buttonClass;

    this.button.title = label;

    this.activate = function() {

        Drutes.curveLayer.getSource().forEachFeature(function(e) {

            coord = e.getGeometry().getCoordinates();
            Drutes.curveColection.add(
                    Drutes.vertexColection.add(coord[0][0], coord[0][1], e.get('property')),
                    Drutes.vertexColection.add(coord[1][0], coord[1][1], e.get('property')),
                    {idPath: e.get('idPath'), property: e.get('property')}
            );
        });
    }

    this.deactivate = function() {

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