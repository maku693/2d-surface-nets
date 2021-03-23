var mask = 0b1000 // 0
var edge_table = [
  0b0000, // i: 0b0000
  0b1001, // i: 0b0001
  0b0011, // i: 0b0010
  0b1011, // i: 0b0011
  0b0110, // i: 0b0100
  0b1111, // i: 0b0101
  0b0111, // i: 0b0110
  0b1111, // i: 0b0111
  0b1100, // i: 0b1000
];

var edge_mask = edge_table[mask]; // 0b1100

var i = 2;
var crossed = edge_mask & (1 << i); // 0b1100 & 0b0100

var i = 3;
var crossed = edge_mask & (1 << i); // 0b1100 & 0b1000
