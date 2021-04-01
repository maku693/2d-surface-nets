function main() {
  const worldSize = 300;
  const grids = 5;
  const gridSize = worldSize / grids;
  const samplePoints = grids + 1;

  const c = document.getElementById("c");
  c.style.width = `${worldSize}px`;
  c.style.height = `${worldSize}px`;

  const ctx = c.getContext("2d");

  const scale = window.devicePixelRatio;
  c.width = worldSize * scale;
  c.height = worldSize * scale;
  ctx.scale(scale, scale);

  ctx.lineWidth = 2;

  drawBackground(ctx, worldSize, gridSize);

  const data = new Uint8Array(grids * grids);
  function data_set(x, y, value) {
    data[y * grids + x] = value;
  }
  data_set(2, 1, 1);
  data_set(1, 2, 1);
  data_set(2, 2, 1);
  data_set(3, 2, 1);
  data_set(2, 3, 1);
  data_set(3, 3, 1);

  drawData(ctx, grids, gridSize, data);
}

function drawBackground(ctx, worldSize, gridSize) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, worldSize, worldSize);

  ctx.strokeStyle = "#0004";
  ctx.beginPath();
  for (let i = 0; i <= ctx.canvas.width; i += gridSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ctx.canvas.height);
  }
  for (let i = 0; i <= ctx.canvas.height; i += gridSize) {
    ctx.moveTo(0, i);
    ctx.lineTo(ctx.canvas.width, i);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawData(ctx, grids, gridSize, data) {
  for (let i = 0; i < data.length; i++) {
    const p = data[i];
    const x = (i % grids) * gridSize;
    const y = parseInt(i / grids) * gridSize;
    ctx.fillStyle = `#f00${(p * 0x8).toString(16)}`;
    ctx.fillRect(x, y, gridSize, gridSize);
  }
}

main();
