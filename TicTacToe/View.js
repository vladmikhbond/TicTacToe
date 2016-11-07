

function View(model, canvas)
{
    this.model = model;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 10;
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


View.prototype.drawWin = function (win)
{
    var ctx = this.ctx;
    this.clearCanvas();
    for (var i = 0; i < 10; i++) {
        ctx.strokeStyle = win.indexOf(i) == -1 ? "black" : "red";
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
    }
}

View.prototype.clearCanvas = function ()
{
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

