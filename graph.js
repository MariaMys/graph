const graphPoints = [
  [1, 0, 0],
  [0, 1, 0],
  [1, 1, 1]
];


const graphEdges = [
  {startPoint: [1, 1], endPoint: [2, 2]},
  {startPoint: [1, 1], endPoint: [3, 1]},
  {startPoint: [2, 2], endPoint: [3, 1]},
  {startPoint: [2, 2], endPoint: [3, 3]},
  {startPoint: [3, 1], endPoint: [3, 2]}
];

const colors = ['blue', 'black', 'green', 'purple', 'yellow'];

function getGraphPoints(graphArray) {
  const graphPoints = [];
  if (!graphArray.length) return;

  graphArray.forEach((row, rowIndex) => {
    row.forEach((el, columnIndex) => {
      if (!el) return;
      graphPoints.push([rowIndex, columnIndex]);
    });
  });

  return graphPoints;
}

function getPointColor(graphPoint, graphEdges) {
  let colorIndex = 0;

  graphEdges.forEach(({startPoint, endPoint}) => {
    if(startPoint.toString() === graphPoint.toString()) ++colorIndex;
    if(endPoint.toString() === graphPoint.toString()) ++colorIndex;
  });

  return colors[colorIndex];
}

class Draw {
  constructor(ctx, radius = 10, scale = 120, baseMargin = 20) {
    this.ctx = ctx;
    this.radius = radius;
    this.scale = scale;
    this.baseMargin = baseMargin;
  }

  circle(x, y, color = 'green') {
    this.ctx.beginPath();
    this.ctx.arc(this._normalizePoints(x), this._normalizePoints(y), this.radius, 0, 2 * Math.PI);
    this.ctx.lineWidth = this.radius * 2;
    this.ctx.strokeStyle = color;
    // circle.fillStyle = 'black';
    this.ctx.stroke();

    this.ctx.fillStyle = 'red';
    this.ctx.font = '20px serif';
    this.ctx.fillText(`${x + 1},${y + 1}`, this._normalizePoints(x) - this.radius, this._normalizePoints(y) + this.radius);
  }

  line(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.lineTo(this._normalizeEdge(x1), this._normalizeEdge(y1));
    this.ctx.lineTo(this._normalizeEdge(x2), this._normalizeEdge(y2));
    this.ctx.lineWidth = 1;
    this.ctx.closePath();
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clear()
  }

  _normalizePoints(point) {
    return point * this.scale + this.baseMargin;
  }

  _normalizeEdge(point) {
    return this._normalizePoints(point - 1);
  }

}

function drawGraph() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const draw = new Draw(ctx);

  graphEdges.forEach(({startPoint, endPoint}) => {
    draw.line(...startPoint, ...endPoint);
  });

  getGraphPoints(graphPoints).forEach(([x, y]) => {
    draw.circle(x, y, getPointColor([x + 1, y + 1], graphEdges));
  });
}

drawGraph();