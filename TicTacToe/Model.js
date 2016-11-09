function Model(size) {
    this.size = size;
    // last cell for long lines
    this.store = [[], [], [], [], [], [], [], [], [], [], ];
    this.field = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ];
}

Model.prototype.count = function (char) {
    var count = 0;
    for (var i = 0; i < this.field.length; i++) {
        if (this.field[i] === char)
            count++;
    }
    return count;
}


Model.prototype.addTrace = function(trace)
{
    trace.model = this;

    if (trace.size() > this.size / 2) {
        // new game
        if (trace.len() > this.size * 3)
            location.reload();
        // grid line
        this.store[9].push(trace);
        return;
    }

    // define row and column
    var c = trace.center();
    var col = c.x / this.size * 3 | 0;
    var row = c.y / this.size * 3 | 0;
    var idx = row * 3 + col;

    //
    var v = trace.value();
    switch (this.field[idx]) {
        case ' ':
            if (v == 'O' && this.count('O') + 1 == this.count('X')) {
                this.field[idx] = 'O';
                this.store[idx].push(trace);
            } else if (v == 'I' && this.count('O') == this.count('X') && this.count('I') == 0) {
                this.field[idx] = 'I';
                this.store[idx].push(trace);
            }
            break;
        case 'I':
            if (v == 'I' && this.count('O') == this.count('X') && this.count('I') == 1) {
                this.field[idx] = 'X';
                this.store[idx].push(trace);
            }
            break;
    }
 
}

// returns 3 indexes
// returns [] if no winner yet
Model.prototype.whoWin = function() 
{
    var f = this.field;
    var m = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
             [0, 3, 6], [1, 4, 7], [2, 5, 8],
             [0, 4, 8], [2, 4, 6], ];

    for (var i = 0; i < 8; i++) {
        var a = m[i][0], b = m[i][1], c = m[i][2];
        if (f[a] == f[b] && f[b] == f[c] && (f[c] == 'O' || f[c] == 'X')) 
            return m[i];
    }
    return [];
}

Model.prototype.cellCenter = function (idx) {
    var c = { x: 0, y: 0 }, n = 0;
    for (var j in this.store[idx])
    {
        var trace = this.store[idx][j];
        for (var i in trace.points)
        {
            c.x += trace.points[i].x;
            c.y += trace.points[i].y;
        }
        n += trace.points.length;
    }
    c.x /= n;
    c.y /= n;
    return c;
}