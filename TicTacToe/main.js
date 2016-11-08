document.getElementById("newGame").onclick = init;

window.onload = init;


function init ()
{
    var model = new Model(Math.min(window.innerWidth, window.innerHeight));
    var canvas = document.getElementById('sketchpad');
    canvas.width = canvas.height = model.size;
    var view = new View(model, canvas);
    new Controller(canvas, model, view);
}

