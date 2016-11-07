function Trace() {
    this.model = null;
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

////////////////////////////////////////////

function Model(size) {
    this.size = size;
    this.store = [[], [], [], [], [], [], [], [], [], ];
    this.field = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ];
}

Model.prototype.addTrace = function (t) 
{
    t.model = this;
    if (t.size() > this.size / 2)
        return;
    // define row and column
    var c = t.center();
    var col = c.x / this.size * 3 | 0;
    var row = c.y / this.size * 3 | 0;
    var idx = row * 3 + col;

    this.store[idx].push(t);

    //
    var v = t.value();
    switch (this.field[idx]) {
        case ' ': 
            this.field[idx] = v;
            break;
        case 'I':
            if (v == 'I') 
                this.field[idx] = 'X';
            break;
    }
 
}

Model.prototype.whoWin = function (t) {
    var f = this.field;
    var m = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
             [0, 3, 6], [1, 4, 7], [2, 5, 8],
             [0, 4, 8], [2, 4, 6], ];
    for (var i = 0; i < 8; i++) {
        var a = m[i][0], b = m[i][1], c = m[i][2];
        if (f[a] == f[b] && f[b] == f[c] && f[c] != ' ')
            return m[i];
    }
    return null;
}