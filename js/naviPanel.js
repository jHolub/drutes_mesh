Drutes.makeConfigMesh = function(label) {

    this.button;

    this.buttonClass = "btn btn-primary";

    this.label = label;

    this.button = document.createElement('div');

    this.button.innerHTML = this.label;

    this.button.id = this.id;

    this.button.className = this.buttonClass;

    this.button.title = label;
    
    var this_ = this;

    this.button.onclick = function() {

        res = "<br>";

        for (j = 0; j < Drutes.vertexCollect.collect.length; j++) {

            res += "vertex " + Drutes.vertexCollect.collect[j].id + " xyz  " + Drutes.vertexCollect.collect[j].x + " " + Drutes.vertexCollect.collect[j].y + " 0 <br>";
        }
        res += "<br>";

        for (j = 0; j < Drutes.curveCollect.collect.length; j++) {

            res += "curve " + Drutes.curveCollect.collect[j].id + " vertex " + Drutes.curveCollect.collect[j].a.id + "  " + Drutes.curveCollect.collect[j].b.id + this_.printProperty(Drutes.curveCollect.collect[j].property) + "<br>";
        }

        for (j = 0; j < Drutes.pathCollect.collection.length; j++) {
            
            res+= "<br>" + "path " + Drutes.pathCollect.collection[j].id + " normal 0 0 1 boundary curve "
            
            for (i = 0; i < Drutes.pathCollect.collection[j].curves.length; i++) {
                
                res +=  " " + Drutes.pathCollect.collection[j].curves[i].id;
            }
            res += this_.printProperty(Drutes.pathCollect.collection[j].property);
        }

        document.getElementById('configResult').innerHTML = res;

    }
    
    this.printProperty = function(proper){
        
        res = "";
        
        for(key in proper){
            
            res += " " + key + " " + proper[key]; 
        }
        
        return res;
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