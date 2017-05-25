function Trace() {
    this.model = null;
    this.points = [];
}

Trace.prototype.addPoint = function (p) {
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

Trace.prototype.len = function () {
    var sum = 0;
    for (var i = 1; i < this.points.length; i++)
        sum += dist(this.points[i - 1], this.points[i]);
    return sum;
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

Trace.prototype.value = function () {
    if (dist(this.points[0], this.points[this.points.length - 1]) < this.model.size / 10)
        return 'O';
    else
        return 'I';
}

function dist(p, q) {
    var dx = p.x - q.x, dy = p.y - q.y;
    return Math.sqrt(dx*dx + dy * dy);
}


