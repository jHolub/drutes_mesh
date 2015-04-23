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

Drutes.makeMesh = function(label) {

    this.button;

    this.buttonClass = "createMesh btn btn-primary";

    this.label = label;

    this.button = document.createElement('div');

    this.button.innerHTML = this.label;

    this.button.id = this.id;

    this.button.className = this.buttonClass;

    this.button.title = label;

    this.control = function() {

        features = Drutes.featureOverlay.getFeatures();

        features.forEach(function(feature) {
            geometry = feature.getGeometry();
            coord = geometry.getCoordinates();
            wkt = new ol.format.WKT();
            polygon = wkt.writeFeature(feature)
        });

        url = Drutes.dir + "query/pok.php?coor=" + polygon;
        $.ajax({
            url: url,
        }).done(function(data) {
            Drutes.setVyber(data);
        });

    };


    this.activate = function() {
        this.button.className = this.buttonClass + " active";
        this.active = true;
        this.control();
    }

    this.deactivate = function() {
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


Drutes.printMesh = function(nodes, elements) {

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