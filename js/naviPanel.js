Drutes.makeConfigMesh = function(label) {

    this.button;

    this.buttonClass = "btn btn-primary";

    this.label = label;

    this.button = document.createElement('div');

    this.button.innerHTML = this.label;

    this.button.id = this.id;

    this.button.className = this.buttonClass;

    this.button.title = label;

    this.button.onclick = function() {

        Drutes.curveLayer.getSource().forEachFeature(function(e) {

            coord = e.getGeometry().getCoordinates();
            Drutes.curveColection.add(
                    Drutes.vertexColection.add(coord[0][0], coord[0][1], e.get('property')),
                    Drutes.vertexColection.add(coord[1][0], coord[1][1], e.get('property')),
                    {idPath: e.get('idPath'), property: e.get('property')}
            );
        });
    }

    this.renderTo = function(id) {

         document.getElementById(id).appendChild(this.button);
    }
}

Drutes.button = function(label) {

    this.button;

    this.buttonClass = "btn btn-primary";

    this.label = label;

    this.button = document.createElement('div');

    this.button.innerHTML = this.label;

    this.button.id = this.id;

    this.button.className = this.buttonClass;

    this.button.title = label;

    this.button.onclick = function() {
    }

    this.renderTo = function(id) {

         document.getElementById(id).appendChild(this.button);
    }
}