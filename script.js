const c = document.getElementsById("c");

c.width = 300;
c.height = 300;

const ctx = c.getContext("2d");

ctx.draw;

const GRID_SIZE = 10;

for (let i = 0; i < c.width; i += 10) {
  ctx.moveTo(i, 0);
  ctx.lineTo(c.height, 0);
}

ctx.stroke();
