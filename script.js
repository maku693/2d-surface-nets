const worldSize = 300;
const gridSize = 50;
const grids = worldSize / gridSize;
const samples = grids + 1;

(() => {
  const c = document.getElementById("c");
  c.style.width = `${worldSize}px`;
  c.style.height = `${worldSize}px`;

  const ctx = c.getContext("2d");

  const scale = window.devicePixelRatio;
  c.width = worldSize * scale;
  c.height = worldSize * scale;
  ctx.scale(scale, scale);

  ctx.lineWidth = 2;

  drawBackground(c, ctx);

  const data = Array.from({ length: samples }, () =>
    new Array(samples).fill(0)
  );

  data[2][3] = 1;
  data[3][2] = 1;
  data[3][3] = 1;
  data[3][4] = 1;
  data[4][3] = 1;
  data[4][4] = 1;

  drawData(ctx, data);

  // const vertices = getVertices(data);
  // drawLines(vertices);

  drawSurface(ctx, data);
})();

function drawBackground(canvas, ctx) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

function drawData(ctx, data) {
  for (let y = 0; y < samples; y++) {
    for (let x = 0; x < samples; x++) {
      if (data[x][y] === 0) continue;
      ctx.fillStyle = "#f008";
      fillCircle(ctx, x * gridSize, y * gridSize, (gridSize / 2) * data[x][y]);
    }
  }
}

function drawSurface(ctx, data) {
  const vertices = [];
  const lines = [];
  for (let y = 0; y < grids; y++) {
    for (let x = 0; x < grids; x++) {
      const surroundings = [
        data[x][y],
        data[x + 1][y],
        data[x][y + 1],
        data[x + 1][y + 1]
      ];

      if (!(surroundings.some(x => x === 0) && surroundings.some(x => 0 < x)))
        continue;

      ctx.fillStyle = "#00f2";
      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
      ctx.fillStyle = "#00f4";
      fillCircle(ctx, (x + 0.5) * gridSize, (y + 0.5) * gridSize, 2);

      const crossings = [];
      const edges = [
        [[0, 0], [1, 0]],
        [[0, 0], [0, 1]],
        [[1, 0], [1, 1]],
        [[0, 1], [1, 1]]
      ];
      for (let edge of edges) {
        const [e1x, e1y] = [x + edge[0][0], y + edge[0][1]];
        const [e2x, e2y] = [x + edge[1][0], y + edge[1][1]];
        const e1 = data[e1x][e1y];
        const e2 = data[e2x][e2y];
        if ((e1 === 0 && 0 < e2) || (0 < e1 && e2 === 0)) {
          ctx.fillStyle = "#0802";
          fillCircle(ctx, e1x * gridSize, e1y * gridSize, 2);
          fillCircle(ctx, e2x * gridSize, e2y * gridSize, 2);
          ctx.fillStyle = "#0804";
          fillCircle(
            ctx,
            (e1x + e2x) * 0.5 * gridSize,
            (e1y + e2y) * 0.5 * gridSize,
            3
          );

          crossings.push([(e1x + e2x) / 2, (e1y + e2y) / 2]);
        }
      }

      const vertex = [
        (crossings[0][0] + crossings[1][0]) * 0.5,
        (crossings[0][1] + crossings[1][1]) * 0.5
      ];

      ctx.fillStyle = "#00f8";
      fillCircle(ctx, vertex[0] * gridSize, vertex[1] * gridSize, 3);

      vertices.push(vertex);
      
      lines.push([]);
    }
  }

  // TODO: stroke lines

  // ctx.beginPath();
  // ctx.closePath();

  // ctx.stroke();
}

function fillCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function strokeCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.stroke();
}

function strokeLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}
