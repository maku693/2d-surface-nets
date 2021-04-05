const worldSize = 300;
const samplePoints = 5;
const grids = samplePoints - 1;
const gridSize = worldSize / grids;

const squareEdges = [0, 1, 0, 2, 1, 3, 2, 3];

/**
 * cornersToEdges is edges indexed by corners.
 * edges and corners are binary flag bits.
 * a bit in corners represents which corners are in the volume.
 * a bit in edges represents which edges are adjacent to the corner.
 */
const cornersToEdges = new Uint8Array(1 << 4);
{
  for (let i = 0; i < cornersToEdges.length; i++) {
    let edges = 0;
    for (let j = 0; j < 4; j++) {
      const a = !!(i & (1 << squareEdges[j * 2]));
      const b = !!(i & (1 << squareEdges[j * 2 + 1]));
      edges |= a === b ? 0 : 1 << j;
    }
    cornersToEdges[i] = edges;
  }
}

const data = new Uint8Array(samplePoints * samplePoints);
function data_set(x, y, value) {
  data[x + y * samplePoints] = value;
}
data_set(2, 1, 1);
data_set(1, 2, 1);
data_set(2, 2, 1);
data_set(3, 2, 1);
data_set(2, 3, 1);
data_set(3, 3, 1);

const c = document.getElementById("c");
c.style.width = `${worldSize}px`;
c.style.height = `${worldSize}px`;

const ctx = c.getContext("2d");

const scale = window.devicePixelRatio;
c.width = worldSize * scale;
c.height = worldSize * scale;
ctx.scale(scale, scale);

ctx.lineWidth = 2;

// background
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, worldSize, worldSize);

ctx.beginPath();
for (let i = 0; i <= ctx.canvas.width; i += gridSize) {
  ctx.moveTo(i, 0);
  ctx.lineTo(i, ctx.canvas.height);
}
for (let i = 0; i <= ctx.canvas.height; i += gridSize) {
  ctx.moveTo(0, i);
  ctx.lineTo(ctx.canvas.width, i);
}
ctx.strokeStyle = "#0002";
ctx.stroke();

ctx.setLineDash([5, 5]);
ctx.beginPath();
for (let i = gridSize / 2; i <= ctx.canvas.width; i += gridSize) {
  ctx.moveTo(i, 0);
  ctx.lineTo(i, ctx.canvas.height);
}
for (let i = gridSize / 2; i <= ctx.canvas.height; i += gridSize) {
  ctx.moveTo(0, i);
  ctx.lineTo(ctx.canvas.width, i);
}
ctx.stroke();

for (let i = 0; i < data.length; i++) {
  const p = data[i];
  if (p === 0) continue;

  const x = (i % samplePoints) * gridSize;
  const y = parseInt(i / samplePoints) * gridSize;

  ctx.fillStyle = "red";
  ctx.fillRect(x - 4, y - 4, 8, 8);
  ctx.fillStyle = "#f004";
  ctx.fillRect(x - gridSize / 2, y - gridSize / 2, gridSize, gridSize);
}
