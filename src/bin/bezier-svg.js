#!/bin/env node --es-module-specifier-resolution=node --experimental-modules
// CLI tool for generation SVG file with random bezier shapes
import {drawPolyBezier, randomPolyInRect} from "../common/graphon.js";
import { JSDOM } from 'jsdom';
import xmlserializer from 'xmlserializer';

const {window} = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, { runScripts: "outside-only" });
global.window = window;
const {default: Snap} = await import('snapsvg');

const width = 500;
const height = 500;
const s = Snap(width, height);

const polys = randomPolyInRect(width, height, 5);
polys.forEach(poly => drawPolyBezier(s, poly));

const svg = xmlserializer.serializeToString(s.node);
console.log(svg);

window.close();

process.exit(0);
