var canvas, ctx; 

var model = new Model(400);
var trace;

// Variables to keep track of the mouse position and left-button status 
var mousePos, mouseDown = 0, lastPos = null;

// Variables to keep track of the touch position
var touchX, touchY;

// Draw a line
function drawLine(ctx,p1,p2) {
    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    r=0; g=0; b=0; a=255;

    // Select a fill style
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Draw a line
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.closePath();
    ctx.stroke();
}


function draw(ctx, win) {
    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    r = 0; g = 0; b = 0; a = 255;

    // Select a fill style
    ctx.strokeStyle = "red";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (var i = 0; i < 9; i++) {
        if (win.indexOf(i) == -1)
            continue;
        for (var j in model.store[i]) {
            var track = model.store[i][j];
            ctx.beginPath();
            var p = track.points[0]
            ctx.moveTo(p.x, p.y);
            for (var k = 1; k < track.points.length; k++) {
                p = track.points[k];
                ctx.lineTo(p.x, p.y);
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
}


// Clear the canvas context using the canvas width and height
function clearCanvas(canvas,ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//==========================================================================

function getMousePos(e) {
    if (!e)
        var e = event;

    if (e.offsetX) {
        return { x: e.offsetX, y: e.offsetY };
    }
    else if (e.layerX) {
        return { x: e.layerX, y: e.layerY };
    }

}

function getTouchPos(e) {
    if (!e)
        var e = event;

    if (e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            return {
                x: touch.pageX - touch.target.offsetLeft,
                y: touch.pageY - touch.target.offsetTop
            };
        }
    }
}

//----------------------------------------------------------------------------

function sketchpad_mouseDown(e) {
    lastPos = getMousePos(e);
    mouseDown = 1;
    trace = new Trace();
    trace.add(lastPos);

}

function sketchpad_touchStart() {
    // Update the touch co-ordinates
    lastPos = getTouchPos();
    if (lastPos) {
        mouseDown = 1;
        trace = new Trace();
        trace.add(lastPos);
    }
    event.preventDefault();
}

//-------------------------------------

function sketchpad_mouseMove(e) {
    mousePos = getMousePos(e);
    if (mouseDown == 1) {
        drawLine(ctx, lastPos, mousePos);
        trace.add(mousePos);
        lastPos = mousePos;
    }
}

function sketchpad_touchMove(e) {
    // Update the touch co-ordinates
    mousePos = getTouchPos(e);

    if (mouseDown == 1) {
        drawLine(ctx, lastPos, mousePos);
        trace.add(mousePos);
        lastPos = mousePos;
    }
    event.preventDefault();
}

//----------------------------------------------


function sketchpad_mouseUp() {
    mouseDown = 0;
    model.addTrace(trace);
    var w = model.whoWin();
    if (w)
        draw(ctx, w);
}

function sketchpad_touchEnd() {
    mouseDown = 0;
    model.addTrace(trace);
    var w = model.whoWin();
    if (w)
        draw(ctx, w);

    event.preventDefault();
}

//------------------------------------------------------


// Set-up the canvas and add our event handlers after the page has loaded
function init() {
    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');

    // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (canvas.getContext)
        ctx = canvas.getContext('2d');

    // Check that we have a valid context to draw on/with before adding event handlers
    if (ctx) {
        // React to mouse events on the canvas, and mouseup on the entire document
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);

        // React to touch events on the canvas
        canvas.addEventListener('touchstart', sketchpad_touchStart, false);
        canvas.addEventListener('touchmove', sketchpad_touchMove, false);
        canvas.addEventListener('touchend', sketchpad_touchEnd, false);
    }
}
