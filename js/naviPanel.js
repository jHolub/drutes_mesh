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
        /*
         Drutes.curveLayer.getSource().forEachFeature(function(e) {
         
         coord = e.getGeometry().getCoordinates();
         Drutes.curveColection.add(
         Drutes.vertexColection.add(coord[0][0], coord[0][1], e.get('property')),
         Drutes.vertexColection.add(coord[1][0], coord[1][1], e.get('property')),
         {idPath: e.get('idPath'), property: e.get('property')}
         );
         });
         */

// init colekce vertex, curve a path, funkce Drutes.addPath-drawPanel.js odstranit init vertex a curve
        /*   
         res = "<br>";
         for(i = 0; i < Drutes.vertexColection.vertex.length; i++){
         
         res += "vertex " + i + " xyz " + Drutes.vertexColection.vertex[i][0] + " " + Drutes.vertexColection.vertex[i][1] + " 0<br>";    
         }
         
         res += "<br>";
         for(i = 0; i < Drutes.curveColection.curve.length; i++){
         
         res += "curve " + i + " vertex " + Drutes.curveColection.curve[i][0] + " " + Drutes.curveColection.curve[i][1] + "<br>";    
         }    
         */
        res = "<br>";

        for (j = 0; j < Drutes.vertexCollect.collect.length; j++) {

            res += "vertex " + Drutes.vertexCollect.collect[j].id + " xyz  " + Drutes.vertexCollect.collect[j].x + " " + Drutes.vertexCollect.collect[j].y + " 0 <br>";
        }
        res += "<br>";

        for (j = 0; j < Drutes.curveCollect.collect.length; j++) {

            res += "curve " + Drutes.curveCollect.collect[j].id + " vertex " + Drutes.curveCollect.collect[j].a.id + "  " + Drutes.curveCollect.collect[j].b.id + "<br>";
        }

        for (j = 0; j < Drutes.pathCollect.collection.length; j++) {
            res+= "<br>" + "path " + Drutes.pathCollect.collection[j].id + " normal 0 0 1 boundary curve "
            for (i = 0; i < Drutes.pathCollect.collection[j].curves.length; i++) {
                res +=  " " + Drutes.pathCollect.collection[j].curves[i].id;
            }
        }

        document.getElementById('configResult').innerHTML = res;

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