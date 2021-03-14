const data = Array.from({ length: 10 * 10 });

(() => {
  const c = document.getElementById("c");

  c.width = 200;
  c.height = 200;

  const ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  ctx.translate(0.5, 0.5);

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.strokeStyle = "#ccc";
  strokeGrid(ctx, 20);

  ctx.fillStyle = "#f00";
  fillCircle(ctx, 20, 20, 2);
})();

function strokeGrid(ctx, gridSize) {
  ctx.beginPath();

  for (let i = gridSize; i < ctx.canvas.width; i += gridSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ctx.canvas.height);
  }

  for (let i = gridSize; i < ctx.canvas.height; i += gridSize) {
    ctx.moveTo(0, i);
    ctx.lineTo(ctx.canvas.width, i);
  }

  ctx.closePath();

  ctx.stroke();
}

function fillCircle(ctx, x, y, radius) {
  ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
  ctx.fill();
}
