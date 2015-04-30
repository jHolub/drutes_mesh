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
        console.log(url);
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


Drutes.createDomain = function(dif, coord, ext) {

    // prevod radian na stupne
    rad2deg = 180 / Math.PI;
    deg2rad = Math.PI / 180;
    // posun na primce
    
    points = new Array();
    
    for (i = 0; i < (coord.length - 1); i++) {

        x = coord[i + 1][0] - coord[i][0];
        y = coord[i + 1][1] - coord[i][1];
        Talfa = y / x;
        degrees = Math.atan(Talfa) * rad2deg;
        
       // Drutes.vector.getSource().addFeature(new ol.Feature(new ol.geom.Point([coord[i][0], coord[i][1]])));
        points.push([coord[i][0], coord[i][1]]);
        
        vectorLength = Math.pow((x * x) + (y * y), 0.5);
        step = 1;
        while ((dif * step) < vectorLength) {
            // gradient x
            grad_x = coord[i + 1][0] - coord[i][0];
            if (grad_x < 0) {
                x_ = (coord[i][0]) - (Math.cos(Math.abs(degrees) * deg2rad) * (dif * step));
            } else {
                x_ = (coord[i][0]) + (Math.cos(Math.abs(degrees) * deg2rad) * (dif * step));
            }
            // gradient y
            grad_y = coord[i + 1][1] - coord[i][1];
            if (grad_y < 0) {
                y_ = (coord[i][1]) - (Math.sin(Math.abs(degrees) * deg2rad) * (dif * step));
            } else {
                y_ = (coord[i][1]) + (Math.sin(Math.abs(degrees) * deg2rad) * (dif * step));
            }
            step++;
            
            points.push([x_, y_]);
            //Drutes.vector.getSource().addFeature(new ol.Feature(new ol.geom.Point([x_, y_])));
        }
    }
    
    Drutes.createMesh(5000, dif, points, ext);
}

Drutes.createMesh = function(density, radius, points, ext) {

    if (!Array.prototype.remove) {
        Array.prototype.remove = function(val) {
            var i = this.indexOf(val);
            return i > -1 ? this.splice(i, 1) : [];
        };
    }

 //   points = new Array(density);
//generate points [x,y]
    for (i = 0; i < density; i++) {
        points.push([ 
            ((ext[2] - ext[0]) * Math.random()) + ext[0], 
            ((ext[3] - ext[1]) * Math.random()) + ext[1]
        ]);
    }
// regular mesh            
    /*           points = new Array();
     for (x = 0; x < 10; x = x + 0.21) {
     for (y = 0; y < 10; y = y + 0.19) {
     points.push([x, y]);
     }
     }
     */

    for (i = 0; i < points.length; i++) {
        // console.log(i);
        for (j = i + 1; j < points.length; j++) {
// vzajemna poloha bodu a kruznice, m = (x' * x0)^2 + (y' * y0)^2 - r^2
            m = Math.pow((points[j][0] - points[i][0]), 2) + Math.pow((points[j][1] - points[i][1]), 2) - Math.pow(radius, 2);
// bod lezi vne nebo na kruznici                    
            if (m <= 0) {
                points.remove(points[j]);
                j--;
            }
        }
    }

    meshPoints = new Array();

    for (i = 0; i < points.length; i++) {

        meshPoints[i] = new jsts.geom.Coordinate(points[i][0], points[i][1]);
    }

    geomFact = new jsts.geom.GeometryFactory();
    input = geomFact.createMultiPoint(meshPoints);
    builder = new jsts.triangulate.DelaunayTriangulationBuilder();
    builder.setSites(input);
    vardelaunayResult = builder.getTriangles(geomFact);
    p = new jsts.io.WKTWriter();
    wkt = p.write(vardelaunayResult);
    pwkt = p.write(input);
    // Drutes.drawWKT(pwkt);   
    Drutes.drawWKT(wkt);

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