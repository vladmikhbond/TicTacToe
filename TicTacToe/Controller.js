function Controller(canvas, model, view) {
    var mousePos, mouseDown = 0, lastPos = null;
    var trace;

    // React to mouse events on the canvas, and mouseup on the entire document
    canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
    canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
    window.addEventListener('mouseup', sketchpad_mouseUp, false);

    // React to touch events on the canvas
    canvas.addEventListener('touchstart', sketchpad_touchStart, false);
    canvas.addEventListener('touchmove', sketchpad_touchMove, false);
    canvas.addEventListener('touchend', sketchpad_mouseUp, false);


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

    //---------------------------------------------

    function sketchpad_mouseDown(e) {
        lastPos = getMousePos(e);
        if (lastPos) {
            mouseDown = 1;
            trace = new Trace();
            trace.addPoint(lastPos);
        }

    }

    function sketchpad_touchStart() {
        // Update the touch co-ordinates
        lastPos = getTouchPos();
        if (lastPos) {
            mouseDown = 1;
            trace = new Trace();
            trace.addPoint(lastPos);
        }
        event.preventDefault();
    }

    //-------------------------------------

    function sketchpad_mouseMove(e) {
        mousePos = getMousePos(e);
        if (mouseDown == 1) {
            view.drawLine(lastPos, mousePos);
            trace.addPoint(mousePos);
            lastPos = mousePos;
        }
    }

    function sketchpad_touchMove(e) {
        mousePos = getTouchPos(e);

        if (mouseDown == 1) {
            view.drawLine(lastPos, mousePos);
            trace.addPoint(mousePos);
            lastPos = mousePos;
        }
        event.preventDefault();
    }

    //----------------------------------------------


    function sketchpad_mouseUp() {
        if (mouseDown) {
            model.addTrace(trace);
            var w = model.whoWin();          
            view.drawWin(w);
            if (w.length == 3) {
                //canvas.removeEventListener('mousedown', sketchpad_mouseDown, false);
                //canvas.removeEventListener('touchstart', sketchpad_touchStart, false);
                view.dance(w);
            }
        }
        mouseDown = 0;
    }

}





