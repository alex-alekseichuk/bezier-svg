// Background as set of random bezier-curved shapes.

import {drawPolyBezier, randomPolyInRect} from "../common/graphon.js";
import Snap from 'snapsvg-cjs';

const s = Snap(addSvgElement());

const width = 500;
const height = 500;

window.onresize = () => resize();
resize();

const polys = randomPolyInRect(width, height, 5);
polys.forEach(poly => drawPolyBezier(s, poly));


function resize() {
  const winWidth = window.innerWidth-5;
  const winHeight = window.innerHeight-5;

  s.attr({
    x: 0,
    y: 0,
    width: winWidth,
    height: winHeight,
    viewBox: winHeight > winWidth ?
      `0 0 ${height * winWidth / winHeight} ${height}` :
      `0 0 ${width} ${width * winHeight / winWidth}`,
  })
}

function addSvgElement() {
  const body = document.getElementsByTagName('body')[0];
  const svg =  document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('bezier-back');
  body.appendChild(svg);
  return svg;
}
