Drutes.importComp = function() {

    this.input = document.createElement('textarea');
    this.input.setAttribute("rows", "10");
    this.input.setAttribute("cols", "90");
    this.input.setAttribute("placeholder", "WKT in plaintext (only POLYGONS format is supported)");


    var this_ = this;

    this.button = document.createElement('div');
    this.button.className = "btn btn-primary";
    this.button.innerHTML = "Import WKT";
    this.button.onclick = function() {

        wkt = this_.input.value;
        format = new ol.format.WKT();
        importWkt = format.readFeature(wkt);
        Drutes.pathLayer.getSource().addFeature(importWkt);
        Drutes.addPath(importWkt);
    }

    var importWrap = document.createElement('div');
    importWrap.appendChild(this.input);
    importWrap.appendChild(this.button);

    this.renderTo = function(id) {

        document.getElementById(id).appendChild(importWrap);
    }

}