Drutes.toolBar = function() {

    this.component = document.createElement("div");
    
    this.component.id = "toolBar";

    this.groupControls = new Array();

    this.groupContainer = new Array();

    for (i = 0; i < arguments.length; i++) {

        this.groupControls[i] = arguments[i];

        this.groupContainer[i] = document.createElement("span");
        this.groupContainer[i].className = 'toolGroup';
        this.groupContainer[i].id = 'toolGroup' + i;

        this.groupContainer[i].onclick = function(controls) {
            return  function(event) {
                for (j = 0; j < controls.length; j++) {
// Firefox need this                    
                    if (!event)
                        event = window.event;
// IE target                    
                    targetEvent = event.target ? event.target : event.srcElement;
                    if (targetEvent != controls[j].render()) {
                        if (controls[j].deactivate) {
                            controls[j].deactivate();
                        }
                    }
                }
            }
        }(this.groupControls[i])

        for (j = 0; j < this.groupControls[i].length; j++) {

            this.groupContainer[i].appendChild(this.groupControls[i][j].render());
        }

        this.component.appendChild(this.groupContainer[i]);
    }

    document.getElementById("tollBar").appendChild(this.component);
};