const worldSize = 240;
const gridSize = 40;
const grids = worldSize / gridSize;
const samples = grids + 1;

(() => {
  const c = document.getElementById("c");

  c.width = worldSize;
  c.height = worldSize;

  const ctx = c.getContext("2d");

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
  // data[4][4] = -1;

  drawData(ctx, data);

  const intersections = findIntersections(ctx, data);

  drawIntersectedGrids(ctx, intersections);

  drawSurface(ctx, data);
})();

function drawBackground(canvas, ctx) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "lightgray";
  strokeGrid(ctx, gridSize);
}

function strokeGrid(ctx, gridSize) {
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
      ctx.fillStyle = `rgba(255, 0, 0, ${data[x][y]})`;
      fillCircle(ctx, x * gridSize, y * gridSize, 2);
    }
  }
}

function findIntersections(ctx, data) {
  const intersections = [];
  for (let y = 0; y < grids; y++) {
    for (let x = 0; x < grids; x++) {
      const surroundings = [
        data[x][y],
        data[x + 1][y],
        data[x][y + 1],
        data[x + 1][y + 1]
      ];

      if (surroundings.some(i => i === 0) && surroundings.some(i => 0 < i)) {
        intersections.push([x, y]);
      }
    }
  }
  return intersections;
}

function drawIntersectedGrids(ctx, intersections) {
  for (let intersection of intersections) {
    ctx.fillStyle = "#f008";
    ctx.fillRect(
      intersection[0] * gridSize,
      intersection[1] * gridSize,
      gridSize,
      gridSize
    );
  }
}

function drawSurface(ctx, data) {
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

      ctx.fillStyle = "blue";
      fillCircle(
        ctx,
        x * gridSize + gridSize / 2,
        y * gridSize + gridSize / 2,
        2
      );

      const surroundingsMass = surroundings.reduce(
        (curr, prev) => curr + prev,
        0
      );

      const centerOfMass = [
        (-1 * surroundings[0] +
          1 * surroundings[1] +
          -1 * surroundings[2] +
          1 * surroundings[3]) /
          surroundingsMass,
        (-1 * surroundings[0] +
          -1 * surroundings[1] +
          1 * surroundings[2] +
          1 * surroundings[3]) /
          surroundingsMass
      ];

      // ctx.lineWidth = 1;
      // ctx.strokeStyle = "red";
      // strokeCircle(
      //   ctx,
      //   x * gridSize + gridSize / 2 + (gridSize / 2) * centerOfMass[0],
      //   y * gridSize + gridSize / 2 + (gridSize / 2) * centerOfMass[1],
      //   4
      // );
    }
  }

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
