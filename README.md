# Bezier SVG

Browser ready JavaScript's code and CLI tool for generation SVG with random Bezier shapes.

It's nice pattern for background.

500 x 500 rectangle is split into several random polygons by 5 random lines.

Then it fits a smooth shape using a quadratic Bezier curve into each polygon.


## Generate page background on the fly

Build JS bundle to be used in browser:
```bash
npm run build
```

Open ./dist/index.html in web browser.

## Generate SVG

Install and run:
```bash
npm i
npx bezier-svg > shapes.svg
```

<div style="background-color: white">
    <img src="example.svg" style="width: 100%" />
</div>
