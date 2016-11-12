var model, view, controller;
var canvas, ctx;

window.onload = function()
{
    model = new Model(Math.min(window.innerWidth, window.innerHeight));
    canvas = document.getElementById('sketchpad');
    canvas.width = canvas.height = model.size;
    ctx = canvas.getContext('2d');
    view = new View();
    controller = new Controller();
}

function refresh() {
    model = new Model(model.size);
    view.clearCanvas();
    controller.addListeners();
}
