

function View(model, canvas)
{
    this.model = model;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = model.size/50;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.clearCanvas();
}


View.prototype.drawLine = function (p1, p2)
{
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    //ctx.closePath();
    ctx.stroke();
}


View.prototype.drawWin = function (win, fi, centers)
{
    var ctx = this.ctx;
    this.clearCanvas();
    for (var i = 0; i < 10; i++) 
    {
        ctx.save();
        var idx = win.indexOf(i);
        if ( idx == -1) {
            ctx.strokeStyle = "black";
            ctx.lineWidth = this.model.size / 50;
        } else {
            // rotation
            if (fi) {
                var c = centers[i];
                ctx.translate(c.x, c.y);
                ctx.rotate(fi);
                ctx.translate(-c.x, -c.y);
            }
            ctx.strokeStyle = "red";
            ctx.lineWidth = this.model.size / 30;
        }

        for (var j in this.model.store[i]) {
            var track = this.model.store[i][j];
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}


View.prototype.show = function (win) {
    var centers = [];
    for (var i = 0; i < win.length; i++)
        centers[win[i]] = this.model.cellCenter(win[i]);

    var fi = 0, timer, me = this;
    if (timer) clearInterval(timer);
    var timer = setInterval(function () {
        me.drawWin(win, fi, centers);
        fi += 0.2;
    }, 10);

    
}