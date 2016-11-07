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
        this.store[9].push(trace);
        return true;
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