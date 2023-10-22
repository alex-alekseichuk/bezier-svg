import {cutPoly, intersectPoly} from "./analytic-geometry.js";

export function drawPoint(s, p, color) {
  s.circle(p[0], p[1], 3).attr({
    fill: color ?? '#ccc',
    strokeWidth: 0,
  });
}

export function drawLine(s, p1, p2) {
  s.line(p1[0], p1[1], p2[0], p2[1]).attr({
    stroke: '#ccc',
    strokeWidth: 1,
  });
}

export function drawPoly(s, poly) {
  s.polyline(poly).attr({
    fill: 'none',
    stroke: '#ccc',
    strokeWidth: 1,
  });
  drawLine(s, poly[0], poly[poly.length - 1]);
  poly.forEach(p => drawPoint(s, p));
}

export function drawPolyBezier(s, poly, color) {
  const startPoint = [(poly[poly.length - 1][0] + poly[0][0]) / 2, (poly[poly.length - 1][1] + poly[0][1]) / 2];
  const p = poly.reduce((s, p, i) => {
    const po = (i + 1) < poly.length ? [(poly[i][0] + poly[i + 1][0]) / 2, (poly[i][1] + poly[i + 1][1]) / 2] : startPoint;
    return s + `Q${poly[i][0]},${poly[i][1]} ${po[0]},${po[1]}`;
  }, `M${startPoint[0]},${startPoint[1]}`);
  s.path(p).attr({
    class: 'bezier-shape',
    strokeWidth: 0,
    ...(color && {fill: color}),
  });
}

export function randomPolyInRect(width, height, nCuts) {
  const polys = [[[0, 0], [width-1, 0], [width-1, height-1], [0, height-1]]];

  for (let i = 0; i < nCuts; i++)
    randomCutPolys(polys);

  return polys;

  function randomCutPolys(polys) {
    const d = 30;
    const x = Math.random() * (width - 2 * d) + d;
    const y = Math.random() * (height - 2 * d) + d;
    const a = Math.random() * (2 * Math.PI) - Math.PI;

    for (let i = 0; i < polys.length; i++) {
      const poly = polys[i];
      if (!intersectPoly(poly, x, y, a))
        continue;
      const pair = cutPoly(poly, x, y, a);
      polys.splice(i, 1, pair[0], pair[1]);
      i++;
    }
  }
}
