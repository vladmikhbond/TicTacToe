window.onload = function()
{
    var model = new Model(Math.min(window.innerWidth, window.innerHeight));
    var canvas = document.getElementById('sketchpad');
    canvas.width = canvas.height = model.size;
    var view = new View(model, canvas);
    new Controller(canvas, model, view);
}

