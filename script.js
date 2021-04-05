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

ctx.fillStyle = "blue";

const gridToVertex = {};

for (let y = 0; y < grids; y++) {
  for (let x = 0; x < grids; x++) {
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "green";

    let corners = 0;

    for (let v = 0; v < 2; v++) {
      for (let u = 0; u < 2; u++) {
        const p = data[x + u + (y + v) * samplePoints];
        corners |= p << (u + v * 2);
      }
    }

    const edges = cornersToEdges[corners];

    let edgeCount = 0;
    let dx = 0;
    let dy = 0;
    for (let j = 0; j < 4; j++) {
      if (!(edges & (1 << j))) continue;
      edgeCount++;

      const e0 = squareEdges[j * 2];
      const e1 = squareEdges[j * 2 + 1];

      const e0x = e0 % 2;
      const e0y = parseInt(e0 / 2);
      const e1x = e1 % 2;
      const e1y = parseInt(e1 / 2);

      ctx.beginPath();
      ctx.moveTo((x + e0x) * gridSize, (y + e0y) * gridSize);
      ctx.lineTo((x + e1x) * gridSize, (y + e1y) * gridSize);
      ctx.stroke();

      dx += (e0x + e1x) / 2;
      dy += (e0y + e1y) / 2;
    }

    if (edgeCount === 0) continue;

    dx /= edgeCount;
    dy /= edgeCount;

    const vx = (x + dx) * gridSize;
    const vy = (y + dy) * gridSize;

    ctx.fillRect(vx - 3, vy - 3, 6, 6);

    gridToVertex[x + y * samplePoints] = [vx, vy];

    ctx.setLineDash([]);
    ctx.strokeStyle = "blue";
    if (y !== 0 && edges & 0b0001) {
      const [vx_, vy_] = gridToVertex[x + (y - 1) * samplePoints];
      ctx.beginPath();
      ctx.moveTo(vx_, vy_);
      ctx.lineTo(vx, vy);
      ctx.stroke();
    }
    if (x !== 0 && edges & 0b0010) {
      const [vx_, vy_] = gridToVertex[x - 1 + y * samplePoints];
      ctx.beginPath();
      ctx.moveTo(vx_, vy_);
      ctx.lineTo(vx, vy);
      ctx.stroke();
    }
  }
}
