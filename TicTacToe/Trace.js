function Trace() {
    this.points = [];
}

Trace.prototype.add = function (p) {
    this.points.push(p);
}

Trace.prototype.center = function () {
    var c = { x: 0, y: 0 };
    for (var i in this.points) {
        c.x += this.points[i].x;
        c.y += this.points[i].y;
    }
    c.x /= this.points.length;
    c.y /= this.points.length;
    return c;
}

Trace.prototype.size = function () {
    var minX = maxX = this.points[0].x;
    var minY = maxY = this.points[0].y;
    for (var i in this.points) {
        if (minX > this.points[i].x) minX = this.points[i].x;
        if (maxX < this.points[i].x) maxX = this.points[i].x;
        if (minY > this.points[i].y) minY = this.points[i].y;
        if (maxY < this.points[i].y) maxY = this.points[i].y;
    }
    return Math.max(maxX - minX, maxY - minY) ;
}

Trace.prototype.size = function () {
    var minX = maxX = this.points[0].x;
    var minY = maxY = this.points[0].y;
    for (var i in this.points) {
        if (minX > this.points[i].x) minX = this.points[i].x;
        if (maxX < this.points[i].x) maxX = this.points[i].x;
        if (minY > this.points[i].y) minY = this.points[i].y;
        if (maxY < this.points[i].y) maxY = this.points[i].y;
    }
    return Math.max(maxX - minX, maxY - minY);
}



////////////////////////////////////////////

function Model(size) {
    this.size = size;
    this.field = [[], [], [],  [], [], [],  [], [], [], ];
}

Model.prototype.add = function (t) {
    if (t.size() > this.size / 2)
        return;
    var c = t.center();
    var col = c.x / this.size * 3 | 0;
    var row = c.y / this.size * 3 | 0;
    this.field[row * 3 + col].push(t);
    
    for (var i in this.field) {
        traces = this.field[i];
        /////////////////////////////////////////////////
    }

}

