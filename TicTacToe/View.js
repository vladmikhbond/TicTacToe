

function View()
{
    ctx.strokeStyle = "black";
    ctx.lineWidth = model.size/50;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    this.clearCanvas();
}


View.prototype.drawLine = function (p1, p2)
{
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    //ctx.closePath();
    ctx.stroke();
}


View.prototype.drawWin = function (win, fi, centers)
{
    this.clearCanvas();
    for (var i = 0; i < 10; i++) 
    {
        ctx.save();
        var idx = win.indexOf(i);
        if ( idx == -1) {
            ctx.strokeStyle = "black";
            ctx.lineWidth = model.size / 50;
        } else {
            // rotation
            if (fi) {
                var c = centers[i];
                ctx.translate(c.x, c.y);
                ctx.rotate(fi);
                ctx.translate(-c.x, -c.y);
            }
            ctx.strokeStyle = "red";
            ctx.lineWidth = model.size / 50;
        }

        for (var j in model.store[i]) {
            var track = model.store[i][j];
            ctx.beginPath();
            var p = track.points[0]
            ctx.moveTo(p.x, p.y);
            for (var k = 1; k < track.points.length; k++) {
                p = track.points[k];
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
        }
        ctx.restore();
    }
}


View.prototype.clearCanvas = function ()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


View.prototype.dance = function (win) {
    var me = this;
    // 1 sec before dance
    setTimeout(function () {
        var centers = [];
        for (var i = 0; i < win.length; i++)
            centers[win[i]] = model.cellCenter(win[i]);

        var fi = 0, timer;
        // dance
        timer = setInterval(function () {
            me.drawWin(win, fi, centers);
            fi += Math.PI / 10;
            if (fi > 30) {
                clearInterval(timer);
                // 1 sec after dance
                setTimeout(refresh, 1000);
            }
        }, 50);
    }, 1000);

}