const c = document.getElementById("c");

c.width = 300;
c.height = 300;

const ctx = c.getContext("2d");

ctx.translate(0.5, 0.5);

ctx.strokeStyle = "#000";

const GRID_SIZE = 10;

ctx.beginPath();

for (let i = GRID_SIZE; i < c.width; i += GRID_SIZE) {
  ctx.moveTo(i, 0);
  ctx.lineTo(i, c.height);
}

for (let i = GRID_SIZE; i < c.height; i += GRID_SIZE) {
  ctx.moveTo(0, i);
  ctx.lineTo(c.width, i);
}

ctx.closePath();

ctx.stroke();

ctx.ellipse(150, 150, 2, 2, 0, 0, 2 * Math.PI);

ctx.fillStyle = "#f00";

ctx.fill();
