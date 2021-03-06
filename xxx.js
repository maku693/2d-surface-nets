var mask = 0b1000; // 8
var square_edges = [0, 1, 0, 2, 1, 3, 2, 3];
var edge_table = [
  0b0000, // i: 0b0000
  0b0011, // i: 0b0001
  0b0101, // i: 0b0010
  0b0111, // i: 0b0011
  0b1100, // i: 0b0100
  0b1111, // i: 0b0101
  0b1101, // i: 0b0110
  0b1111, // i: 0b0111
  0b1010, // i: 0b1000
  undefined // ...
];

var edge_table = new Uint8Array(Math.pow(2, 4));
for (var i = 0; i < edge_table.length; i++) {
  var edge_mask = 0;
  for (var j = 0; j < square_edges.length; j += 2) {
    var a = !!(i & (1 << square_edges[j]));
    var b = !!(i & (1 << square_edges[j + 1]));
  }
  edge_table[i] = edge_mask;
}

var edge_mask = edge_table[mask]; // 0b1010

var i = 2; // 0b0010
var crossed = edge_mask & (1 << i); // 0b1010 & 0b0010
console.assert(crossed);

var i = 3; // 0b0011
var crossed = edge_mask & (1 << i); // 0b1010 & 0b0011
console.assert(crossed);
