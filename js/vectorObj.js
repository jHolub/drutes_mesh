Drutes.pathCollect = new function() {

    this.collection = new Array();

    this.index = 0;

    this.add = function(path) {
        this.collection[this.index] = path;
        this.index++;
    };
    
    this.get = function(id){
        
        return this.collection[id];
    }
}();

Drutes.pathObj = function(curves) {

    this.curves = curves;

    this.property = {};

    this.index = 0;
    
    this.id = Drutes.pathCollect.index;
    
    Drutes.pathCollect.add(this);    
}


Drutes.curveCollect = new function() {

    this.collect = new Array();
    
    this.index = 0;
    
    this.add = function(curve) {
        this.collect[this.index] = curve;
        this.index++;
    };
    
    this.get = function(id){
        
        return this.collect[id];
    }; 
    
}();

Drutes.curveObj = function(a, b) {
// vertex a
    this.a = a;
//vertex b
    this.b = b;
    
    this.property = {};

    this.isIn = function(a, b) {
        for (var i = 0; i < Drutes.curveCollect.collect.length; i++) {
            if (Drutes.curveCollect.collect[i].a.id ===
                    a.id && Drutes.curveCollect.collect[i].b.id === b.id) {
                return Drutes.curveCollect.collect[i];
            }

            if (Drutes.curveCollect.collect[i].a.id === 
                    b.id && Drutes.curveCollect.collect[i].b.id === a.id)
            {
                return Drutes.curveCollect.collect[i];
            }
        }
        return false;
    };

    isIn = this.isIn(this.a, this.b);
    if (!isIn) {

        this.id = Drutes.curveCollect.index
        Drutes.curveCollect.add(this);
        return this;
    } else {

        return isIn;
    }
}

Drutes.vertexCollect = new function() {

    this.collect = new Array();
    this.index = 0;
    this.add = function(vertex) {
        this.collect[this.index] = vertex;
        this.index++;
    }
}();

Drutes.vertexObj = function(x, y) {

    this.x = x;

    this.y = y;
    
    this.property = {};

    this.isIn = function(x, y) {
        for (var i = 0; i < Drutes.vertexCollect.collect.length; i++) {
            if (Drutes.vertexCollect.collect[i].x === x
                    &&
                    Drutes.vertexCollect.collect[i].y === y) {
                return Drutes.vertexCollect.collect[i];
            }
        }
        return false;
    };

    isIn = this.isIn(this.x, this.y);
    if (!isIn) {

        this.id = Drutes.vertexCollect.index
        Drutes.vertexCollect.add(this);
        return this;
    } else {

        return isIn;
    }
}