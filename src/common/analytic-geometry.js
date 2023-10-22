/**
 Point is an array of 2 numbers [x, y].
 Poly (polygon) is an array of points in the order.
 Line (x, y, a). Point [x, y] is on the line and `a` is the angle from -PI to PI
 */

// Returns true if the line (x, y, a) intersects the poly.
export function intersectPoly(poly, x, y, a) {
  const side = getSide(poly[0], x, y, a);
  for (let i = 1; i < poly.length; i++)
    if (side !== getSide(poly[i], x, y, a))
      return true;
  return false;
}

// Returns true or false side of tge point against the line (x, y, a).
export function getSide(point, x, y, a) {
  let b = Math.atan2(point[1] - y, point[0] - x) - a;
  if (b < -Math.PI) b += 2 * Math.PI;
  if (b > Math.PI) b -= 2 * Math.PI;
  return b > 0;
}

// Assume the line intersects the poly.
// Returns an array of 2 new poly's.
export function cutPoly(poly, x, y, a) {
  const pairs = [[], []];
  let iPrevSide = Number(getSide(poly[0], x, y, a));
  const iFirstSide = iPrevSide;
  pairs[iPrevSide].push(poly[0]);
  let point;
  for (let i = 1; i < poly.length; i++) {
    point = poly[i];
    const iSide = Number(getSide(point, x, y, a));
    if (iPrevSide !== iSide) {
      const crossPoint = getCrossPoint(pairs[iPrevSide][pairs[iPrevSide].length - 1], point, x, y, a);
      pairs[iPrevSide].push(crossPoint);
      iPrevSide = iSide;
      pairs[iPrevSide].push(crossPoint);
    }
    pairs[iPrevSide].push(point);
  }
  if (iPrevSide !== iFirstSide) {
    const crossPoint = getCrossPoint(poly[0], point, x, y, a);
    pairs[0].push(crossPoint);
    pairs[1].push(crossPoint);
  }
  return pairs;
}

// Returns point of intersect line (x0, y0, a) and line (p1, p2).
export function getCrossPoint(p1, p2, x0, y0, a) {
  const tg = Math.tan(a);
  const x = (p1[0] * (p2[1] - p1[1]) + (p2[0] - p1[0]) * (y0 - tg * x0 - p1[1])) / (p2[1] - p1[1] - tg * (p2[0] - p1[0]));
  return [x, (x - x0) * tg + y0];
}
