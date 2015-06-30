Drutes.map = new ol.Map({
    renderer: 'canvas',
    target: 'map',
    layers: [Drutes.grid],
    controls: ol.control.defaults().extend([new ol.control.ScaleLine({units: 'metric'})]),
    interactions: ol.interaction.defaults({doubleClickZoom: false}),
    view: new ol.View({
        center: [0, 0],
        zoom: 21,
        extent: [-1000, -1000, 1000, 1000],
        minZoom: 18,
        maxZoom: 24
    })
});

Drutes.mousePositionTemplate = 'X: {x}[m] Y: {y}[m]';

Drutes.map.addControl(new ol.control.MousePosition({
    coordinateFormat: function(coord) {
        return ol.coordinate.format(coord, Drutes.mousePositionTemplate, 3);
    },
    className: 'custom-mouse-position',
    target: document.getElementById('mousePosition'),
    undefinedHTML: '&nbsp;'
}));


