const chessboard = document.getElementById('chessboard');
const playerTurnElement = document.getElementById('playerTurn'); 
const resetButton = document.getElementById('resetButton');

const initialBoardState = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

let boardState = JSON.parse(JSON.stringify(initialBoardState)); 

const pieceSVGs = {
  'K': `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45">
  <g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
    <path stroke-linejoin="miter" d="M22.5 11.63V6M20 8h5"/>
    <path fill="#fff" stroke-linecap="butt" stroke-linejoin="miter" d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/>
    <path fill="#fff" d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7"/>
    <path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0"/>
  </g>
</svg>`,
  'Q': `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
  <g style="fill:#ffffff;stroke:#000000;stroke-width:1.5;stroke-linejoin:round">
    <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"/>
    <path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"/>
    <path d="M 11.5,30 C 15,29 30,29 33.5,30" style="fill:none"/>
    <path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" style="fill:none"/>
    <circle cx="6" cy="12" r="2" />
    <circle cx="14" cy="9" r="2" />
    <circle cx="22.5" cy="8" r="2" />
    <circle cx="31" cy="9" r="2" />
    <circle cx="39" cy="12" r="2" />
  </g>
</svg>`,
  'R': `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
  <g style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" transform="translate(0,0.3)">
    <path
      d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
      style="stroke-linecap:butt;" />
    <path
      d="M 34,14 L 31,17 L 14,17 L 11,14" />
    <path
      d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"
      style="stroke-linecap:butt; stroke-linejoin:miter;" />
    <path
      d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
    <path
      d="M 11,14 L 34,14"
      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />
  </g>
</svg>`,
  'B': `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
  <g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" transform="translate(0,0.6)">
    <g style="fill:#ffffff; stroke:#000000; stroke-linecap:butt;">
      <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"/>
      <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"/>
      <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"/>
    </g>
    <path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" style="fill:none; stroke:#000000; stroke-linejoin:miter;"/>
  </g>
</svg>`,
  'N': `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
  <g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" transform="translate(0,0.3)">
    <path
      d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
      style="fill:#ffffff; stroke:#000000;" />
    <path
      d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
      style="fill:#ffffff; stroke:#000000;" />
    <path
      d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
      style="fill:#000000; stroke:#000000;" />
    <path
      d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
      transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
      style="fill:#000000; stroke:#000000;" />
  </g>
</svg>`,
  'P': `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
  <path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z" style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"/>
</svg>`,
  'k': `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
  <g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
    <path d="M 22.5,11.63 L 22.5,6" style="fill:none; stroke:#000000; stroke-linejoin:miter;" id="path6570"/>
    <path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" style="fill:#000000;fill-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;"/>
    <path d="M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37" style="fill:#000000; stroke:#000000;"/>
    <path d="M 20,8 L 25,8" style="fill:none; stroke:#000000; stroke-linejoin:miter;"/>
    <path d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.5,26.6 L 22.5,24.5 C 20,18 10.85,14 6.97,19.85 C 4.5,25.5 13,29.5 13,29.5" style="fill:none; stroke:#ffffff;"/>
    <path d="M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37" style="fill:none; stroke:#ffffff;"/>
  </g>
</svg>`,
  'q': `<?xml version="1.0" encoding="utf-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45"
height="45">
  <g style="fill:#000000;stroke:#000000;stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round">
    <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
    style="stroke-linecap:butt;fill:#000000" />
    <path d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z" />
    <path d="M 11.5,30 C 15,29 30,29 33.5,30" />
    <path d="m 12,33.5 c 6,-1 15,-1 21,0" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="14" cy="9" r="2" />
    <circle cx="22.5" cy="8" r="2" />
    <circle cx="31" cy="9" r="2" />
    <circle cx="39" cy="12" r="2" />
    <path d="M 11,38.5 A 35,35 1 0 0 34,38.5"
    style="fill:none; stroke:#000000;stroke-linecap:butt;" />
    <g style="fill:none; stroke:#ffffff;">
      <path d="M 11,29 A 35,35 1 0 1 34,29" />
      <path d="M 12.5,31.5 L 32.5,31.5" />
      <path d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" />
      <path d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" />
    </g>
  </g>
</svg>`,
  'r': `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
  <g style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" transform="translate(0,0.3)">
    <path
      d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
      style="stroke-linecap:butt;stroke-linejoin:miter;" />
    <path
      d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 12,35.5 L 33,35.5 L 33,35.5"
      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
    <path
      d="M 13,31.5 L 32,31.5"
      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
    <path
      d="M 14,29.5 L 31,29.5"
      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
    <path
      d="M 14,16.5 L 31,16.5"
      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
    <path
      d="M 11,14 L 34,14"
      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
  </g>
</svg>`,
  'b': `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
  <g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" transform="translate(0,0.6)">
    <g style="fill:#000000; stroke:#000000; stroke-linecap:butt;">
      <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"/>
      <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"/>
      <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"/>
    </g>
    <path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" style="fill:none; stroke:#ffffff; stroke-linejoin:miter;"/>
  </g>
</svg>`,
  'n': `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
  <g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" transform="translate(0,0.3)">
    <path
      d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
      style="fill:#000000; stroke:#000000;" />
    <path
      d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
      style="fill:#000000; stroke:#000000;" />
    <path
      d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
      style="fill:#ffffff; stroke:#ffffff;" />
    <path
      d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
      transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
      style="fill:#ffffff; stroke:#ffffff;" />
    <path
      d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "
      style="fill:#ffffff; stroke:none;" />
  </g>
</svg>`,
  'p': `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
  <path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z" style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"/>
</svg>`
};

let selectedPiece = null;
let selectedSquareElement = null;
let currentPlayer = 'white';
let enPassantTargetSquare = null; 
let gameOver = false; 

let castlingRights = {
  white: { kingSide: true, queenSide: true },
  black: { kingSide: true, queenSide: true }
};

// --- Helper Functions ---
function findKingPosition(kingColor, currentBoardState) {
    const kingPiece = kingColor === 'white' ? 'K' : 'k';
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (currentBoardState[r][c] === kingPiece) {
                return { row: r, col: c };
            }
        }
    }
    return null; 
}

function getPieceColor(piece) {
  if (!piece || piece === '') return null;
  return (piece === piece.toUpperCase()) ? 'white' : 'black';
}

// --- UI Update Functions ---
function updateTurnDisplay() {
  if (playerTurnElement) {
    if (gameOver) {
        // Message is set by game end logic, no need to update here further unless specific styling
    } else {
        playerTurnElement.textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
    }
  }
}

function updateCheckHighlighting() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(sq => sq.classList.remove('in-check'));

    if (gameOver) return; 

    const kingPos = findKingPosition(currentPlayer, boardState);
    if (kingPos) {
        const opponentColor = (currentPlayer === 'white' ? 'black' : 'white');
        // Pass the current actual game state for checking attacks
        if (isSquareAttacked(kingPos.row, kingPos.col, opponentColor, boardState, castlingRights, enPassantTargetSquare)) {
            const kingSquareIndex = kingPos.row * 8 + kingPos.col;
            const kingSquareElement = chessboard.children[kingSquareIndex];
            if (kingSquareElement) {
                kingSquareElement.classList.add('in-check');
            }
        }
    }
}

function renderPieces() {
  const squares = chessboard.children;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const pieceChar = boardState[i][j];
      const squareIndex = i * 8 + j;
      if (squares[squareIndex]) {
        if (pieceChar && pieceSVGs[pieceChar]) {
          squares[squareIndex].innerHTML = pieceSVGs[pieceChar];
        } else {
          squares[squareIndex].innerHTML = '';
        }
      }
    }
  }
}


// --- Core Game Logic Functions ---
function isSquareAttacked(targetRow, targetCol, attackerColor, currentBoardState, currentCastlingRights, currentEnPassantTarget) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = currentBoardState[r][c];
      if (piece && getPieceColor(piece) === attackerColor) {
        const pieceType = piece.toLowerCase();
        if (pieceType === 'p') {
          if (attackerColor === 'white') {
            if (r - 1 === targetRow && Math.abs(c - targetCol) === 1) return true;
          } else { 
            if (r + 1 === targetRow && Math.abs(c - targetCol) === 1) return true;
          }
        } else {
          if (isValidMove(piece, r, c, targetRow, targetCol, currentBoardState, currentCastlingRights, currentEnPassantTarget)) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

function isValidMove(piece, fromRow, fromCol, toRow, toCol, currentBoardState, currentCastlingRights, currentEnPassantTarget) {
  if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) {
    return false;
  }
  const pieceType = piece.toLowerCase();
  const pieceColor = getPieceColor(piece);
  const targetSquarePiece = currentBoardState[toRow][toCol];
  const targetSquareColor = getPieceColor(targetSquarePiece);

  if (targetSquareColor && targetSquareColor === pieceColor) { 
    return false;
  }

  if (pieceType === 'p') {
    if (pieceColor === 'white') {
      if (toCol === fromCol && targetSquarePiece === '' && toRow === fromRow - 1) return true;
      if (fromRow === 6 && toCol === fromCol && targetSquarePiece === '' && currentBoardState[fromRow - 1][toCol] === '' && toRow === fromRow - 2) return true;
      if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow - 1 && targetSquareColor === 'black') return true;
      if (currentEnPassantTarget && toRow === currentEnPassantTarget.row && toCol === currentEnPassantTarget.col) {
        if (fromRow === 3 && Math.abs(toCol - fromCol) === 1 && currentBoardState[toRow][toCol] === '') {
          return true;
        }
      }
    } else { 
      if (toCol === fromCol && targetSquarePiece === '' && toRow === fromRow + 1) return true;
      if (fromRow === 1 && toCol === fromCol && targetSquarePiece === '' && currentBoardState[fromRow + 1][toCol] === '' && toRow === fromRow + 2) return true;
      if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + 1 && targetSquareColor === 'white') return true;
      if (currentEnPassantTarget && toRow === currentEnPassantTarget.row && toCol === currentEnPassantTarget.col) {
        if (fromRow === 4 && Math.abs(toCol - fromCol) === 1 && currentBoardState[toRow][toCol] === '') {
          return true;
        }
      }
    }
  } else if (pieceType === 'k') {
    const opponentColor = (pieceColor === 'white') ? 'black' : 'white';
    if (fromCol === 4 && Math.abs(toCol - fromCol) === 2) { 
        if (pieceColor === 'white' && fromRow === 7) {
            if (toCol === 6 && currentCastlingRights.white.kingSide) { 
                if (currentBoardState[7][5] === '' && currentBoardState[7][6] === '' &&
                    !isSquareAttacked(7, 4, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget) &&
                    !isSquareAttacked(7, 5, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget) &&
                    !isSquareAttacked(7, 6, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget)) {
                    return true;
                }
            } else if (toCol === 2 && currentCastlingRights.white.queenSide) {
                if (currentBoardState[7][1] === '' && currentBoardState[7][2] === '' && currentBoardState[7][3] === '' &&
                    !isSquareAttacked(7, 4, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget) &&
                    !isSquareAttacked(7, 3, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget) &&
                    !isSquareAttacked(7, 2, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget)) {
                    return true;
                }
            }
        } else if (pieceColor === 'black' && fromRow === 0) {
            if (toCol === 6 && currentCastlingRights.black.kingSide) { 
                if (currentBoardState[0][5] === '' && currentBoardState[0][6] === '' &&
                    !isSquareAttacked(0, 4, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget) &&
                    !isSquareAttacked(0, 5, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget) &&
                    !isSquareAttacked(0, 6, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget)) {
                    return true;
                }
            } else if (toCol === 2 && currentCastlingRights.black.queenSide) { 
                if (currentBoardState[0][1] === '' && currentBoardState[0][2] === '' && currentBoardState[0][3] === '' &&
                    !isSquareAttacked(0, 4, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget) &&
                    !isSquareAttacked(0, 3, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget) &&
                    !isSquareAttacked(0, 2, opponentColor, currentBoardState, currentCastlingRights, currentEnPassantTarget)) {
                    return true;
                }
            }
        }
    }
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
    if (rowDiff <= 1 && colDiff <= 1) {
      return true;
    }
  } else if (pieceType === 'r') {
    if (fromRow === toRow || fromCol === toCol) {
      if (fromRow === toRow) {
        const step = (toCol - fromCol > 0) ? 1 : -1;
        for (let c = fromCol + step; c !== toCol; c += step) {
          if (currentBoardState[fromRow][c] !== '') return false;
        }
      } else {
        const step = (toRow - fromRow > 0) ? 1 : -1;
        for (let r = fromRow + step; r !== toRow; r += step) {
          if (currentBoardState[r][fromCol] !== '') return false;
        }
      }
      return true;
    }
  } else if (pieceType === 'n') {
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
    if ((rowDiff === 1 && colDiff === 2) || (rowDiff === 2 && colDiff === 1)) {
      return true;
    }
  } else if (pieceType === 'b') {
    if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
      const rowStep = (toRow - fromRow > 0) ? 1 : -1;
      const colStep = (toCol - fromCol > 0) ? 1 : -1;
      let r = fromRow + rowStep;
      let c = fromCol + colStep;
      while (r !== toRow) {
        if (currentBoardState[r][c] !== '') return false;
        r += rowStep;
        c += colStep;
      }
      return true;
    }
  } else if (pieceType === 'q') {
    if (fromRow === toRow || fromCol === toCol) {
      if (fromRow === toRow) {
        const step = (toCol - fromCol > 0) ? 1 : -1;
        for (let c = fromCol + step; c !== toCol; c += step) {
          if (currentBoardState[fromRow][c] !== '') return false;
        }
      } else {
        const step = (toRow - fromRow > 0) ? 1 : -1;
        for (let r = fromRow + step; r !== toRow; r += step) {
          if (currentBoardState[r][fromCol] !== '') return false;
        }
      }
      return true;
    }
    if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
      const rowStep = (toRow - fromRow > 0) ? 1 : -1;
      const colStep = (toCol - fromCol > 0) ? 1 : -1;
      let r = fromRow + rowStep;
      let c = fromCol + colStep;
      while (r !== toRow) {
        if (currentBoardState[r][c] !== '') return false;
        r += rowStep;
        c += colStep;
      }
      return true;
    }
  }
  return false;
}

function hasLegalMoves(playerColor, currentBoardState, currentCastlingRights, currentEnPassantTarget) {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = currentBoardState[r][c];
            if (piece && getPieceColor(piece) === playerColor) {
                for (let toR = 0; toR < 8; toR++) {
                    for (let toC = 0; toC < 8; toC++) {
                        const simulatedBoardState = JSON.parse(JSON.stringify(currentBoardState));
                        const simulatedCastlingRights = JSON.parse(JSON.stringify(currentCastlingRights));
                        const simulatedEnPassantTarget = currentEnPassantTarget ? {...currentEnPassantTarget} : null;

                        if (isValidMove(piece, r, c, toR, toC, simulatedBoardState, simulatedCastlingRights, simulatedEnPassantTarget)) {
                            const pieceMovedType = piece.toLowerCase();
                            simulatedBoardState[toR][toC] = piece;
                            simulatedBoardState[r][c] = '';

                            if (pieceMovedType === 'p' && simulatedEnPassantTarget && toR === simulatedEnPassantTarget.row && toC === simulatedEnPassantTarget.col) {
                                if (playerColor === 'white') simulatedBoardState[toR + 1][toC] = '';
                                else simulatedBoardState[toR - 1][toC] = '';
                            }
                            if (pieceMovedType === 'k' && Math.abs(c - toC) === 2) { 
                                if (toC === 6) { 
                                    simulatedBoardState[r][5] = simulatedBoardState[r][7];
                                    simulatedBoardState[r][7] = '';
                                } else { 
                                    simulatedBoardState[r][3] = simulatedBoardState[r][0];
                                    simulatedBoardState[r][0] = '';
                                }
                            }
                            // Pawn promotion on simulated board
                            if (pieceMovedType === 'p') {
                                if (playerColor === 'white' && toR === 0) simulatedBoardState[toR][toC] = 'Q';
                                else if (playerColor === 'black' && toR === 7) simulatedBoardState[toR][toC] = 'q';
                            }


                            const kingPos = findKingPosition(playerColor, simulatedBoardState);
                            if (kingPos && !isSquareAttacked(kingPos.row, kingPos.col, (playerColor === 'white' ? 'black' : 'white'), simulatedBoardState, simulatedCastlingRights, simulatedEnPassantTarget)) {
                                return true; 
                            }
                        }
                    }
                }
            }
        }
    }
    return false; 
}


function handleSquareClick(event) {
  if (gameOver) return; 

  const clickedSquareElement = event.currentTarget;
  const targetRow = parseInt(clickedSquareElement.dataset.row);
  const targetCol = parseInt(clickedSquareElement.dataset.col);

  if (selectedPiece) {
    const originalRow = parseInt(selectedSquareElement.dataset.row);
    const originalCol = parseInt(selectedSquareElement.dataset.col);
    const pieceMoved = selectedPiece;
    const pieceMovedType = pieceMoved.toLowerCase();
    const pieceMovedColor = getPieceColor(pieceMoved);

    const originalBoardState = JSON.parse(JSON.stringify(boardState));
    const originalCastlingRights = JSON.parse(JSON.stringify(castlingRights));
    const originalEnPassantTargetSquare = enPassantTargetSquare ? {...enPassantTargetSquare} : null;
    
    if (isValidMove(pieceMoved, originalRow, originalCol, targetRow, targetCol, boardState, castlingRights, enPassantTargetSquare)) {
      
      let isEnPassantCapture = false;
      if (pieceMovedType === 'p' &&
          enPassantTargetSquare && 
          targetRow === enPassantTargetSquare.row &&
          targetCol === enPassantTargetSquare.col &&
          boardState[targetRow][targetCol] === '') { 
        isEnPassantCapture = true;
      }

      boardState[targetRow][targetCol] = pieceMoved;
      boardState[originalRow][originalCol] = '';

      if (isEnPassantCapture) {
        if (pieceMovedColor === 'white') boardState[targetRow + 1][targetCol] = ''; 
        else boardState[targetRow - 1][targetCol] = ''; 
      }
      
      if (pieceMovedType === 'p') {
        if (pieceMovedColor === 'white' && targetRow === 0) boardState[targetRow][targetCol] = 'Q';
        else if (pieceMovedColor === 'black' && targetRow === 7) boardState[targetRow][targetCol] = 'q';
      }

      if (pieceMovedType === 'k' && Math.abs(originalCol - targetCol) === 2) {
        if (targetCol === 6) { 
          const rook = pieceMovedColor === 'white' ? 'R' : 'r';
          const rookRow = pieceMovedColor === 'white' ? 7 : 0;
          boardState[rookRow][5] = rook; 
          boardState[rookRow][7] = '';   
        } else if (targetCol === 2) { 
          const rook = pieceMovedColor === 'white' ? 'R' : 'r';
          const rookRow = pieceMovedColor === 'white' ? 7 : 0;
          boardState[rookRow][3] = rook; 
          boardState[rookRow][0] = '';  
        }
      }
      
      const kingPos = findKingPosition(currentPlayer, boardState);
      const opponentColor = (currentPlayer === 'white') ? 'black' : 'white';
      if (kingPos && isSquareAttacked(kingPos.row, kingPos.col, opponentColor, boardState, castlingRights, enPassantTargetSquare)) {
        boardState.length = 0; 
        originalBoardState.forEach(row => boardState.push(row.slice())); 
        castlingRights.white = {...originalCastlingRights.white};
        castlingRights.black = {...originalCastlingRights.black};
        enPassantTargetSquare = originalEnPassantTargetSquare;
        console.log("Illegal move: King would be in check.");
      } else { 
        if (pieceMovedType === 'k') {
          castlingRights[pieceMovedColor].kingSide = false;
          castlingRights[pieceMovedColor].queenSide = false;
        } else if (pieceMovedType === 'r') {
          if (pieceMovedColor === 'white') {
            if (originalRow === 7 && originalCol === 0) castlingRights.white.queenSide = false;
            if (originalRow === 7 && originalCol === 7) castlingRights.white.kingSide = false;
          } else { 
            if (originalRow === 0 && originalCol === 0) castlingRights.black.queenSide = false;
            if (originalRow === 0 && originalCol === 7) castlingRights.black.kingSide = false;
          }
        }

        let newEnPassantTarget = null;
        if (pieceMovedType === 'p' && Math.abs(targetRow - originalRow) === 2) {
          if (pieceMovedColor === 'white') newEnPassantTarget = { row: originalRow - 1, col: originalCol };
          else newEnPassantTarget = { row: originalRow + 1, col: originalCol };
        }
        enPassantTargetSquare = newEnPassantTarget; 

        const previousPlayer = currentPlayer; 
        currentPlayer = (currentPlayer === 'white') ? 'black' : 'white'; 
        
        renderPieces(); // Render before check/mate/stalemate logic to show the move
        updateTurnDisplay(); // Update to show whose turn it is now
        updateCheckHighlighting(); // Highlight check for the new current player

        const nextPlayerKingPos = findKingPosition(currentPlayer, boardState);
        const isNextPlayerInCheck = nextPlayerKingPos ? isSquareAttacked(nextPlayerKingPos.row, nextPlayerKingPos.col, previousPlayer, boardState, castlingRights, enPassantTargetSquare) : false;
        // Note: hasLegalMoves already uses the global castlingRights and enPassantTargetSquare which are now set for the *next* player's turn.
        const nextPlayerHasLegalMoves = hasLegalMoves(currentPlayer, boardState, castlingRights, enPassantTargetSquare);

        if (isNextPlayerInCheck && !nextPlayerHasLegalMoves) {
            console.log("Checkmate! " + previousPlayer.charAt(0).toUpperCase() + previousPlayer.slice(1) + " wins.");
            playerTurnElement.textContent = "Checkmate! " + previousPlayer.charAt(0).toUpperCase() + previousPlayer.slice(1) + " wins.";
            gameOver = true;
        } else if (!isNextPlayerInCheck && !nextPlayerHasLegalMoves) {
            console.log("Stalemate! It's a draw.");
            playerTurnElement.textContent = "Stalemate! It's a draw.";
            gameOver = true;
        } else if (isNextPlayerInCheck && playerTurnElement.textContent.indexOf('(Check!)') === -1 ) { // Avoid double (Check!)
             // This console log was for the previous player's perspective.
             // The updateCheckHighlighting and turn display will handle the current player's check status.
             // console.log(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " is in Check!");
             if(playerTurnElement) playerTurnElement.textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " (Check!)";

        }
      }
    } else { 
      console.log(`Invalid move: ${pieceMoved} from (${originalRow},${originalCol}) to (${targetRow},${targetCol})`);
      enPassantTargetSquare = null; 
    }

    selectedSquareElement.classList.remove('selected');
    selectedPiece = null;
    selectedSquareElement = null;

  } else { 
    const pieceOnClickedSquare = boardState[targetRow][targetCol];
    if (pieceOnClickedSquare) {
      const pieceColor = getPieceColor(pieceOnClickedSquare);
      if (pieceColor === currentPlayer) {
        selectedPiece = pieceOnClickedSquare;
        selectedSquareElement = clickedSquareElement;
        selectedSquareElement.classList.add('selected');
      } else {
        console.log("Not your turn. Selected piece color: " + pieceColor + ", current player: " + currentPlayer);
      }
    }
  }
  // Render at the end to reflect any state changes or reverts, unless game is over
  if(!gameOver) renderPieces(); 
  // Always update check highlighting after a click attempt, even if illegal (to clear previous highlights)
  // or if the game just ended (to show the final check state or clear it if stalemate)
  // updateCheckHighlighting() will handle the gameOver case internally.
  updateCheckHighlighting(); 
}

function resetGame() {
    boardState = JSON.parse(JSON.stringify(initialBoardState));
    currentPlayer = 'white';
    castlingRights = {
        white: { kingSide: true, queenSide: true },
        black: { kingSide: true, queenSide: true }
    };
    enPassantTargetSquare = null;
    gameOver = false;

    selectedPiece = null;
    if (selectedSquareElement) {
        selectedSquareElement.classList.remove('selected');
        selectedSquareElement = null;
    }

    renderPieces();
    updateTurnDisplay(); 
    updateCheckHighlighting(); // Clear any check highlights from previous game
    console.log("Game reset!");
}

resetButton.addEventListener('click', resetGame);

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.row = i;
    square.dataset.col = j;
    if ((i + j) % 2 === 0) {
      square.classList.add('white');
    } else {
      square.classList.add('black');
    }
    square.addEventListener('click', handleSquareClick);
    chessboard.appendChild(square);
  }
}

renderPieces();
updateTurnDisplay();
updateCheckHighlighting(); // Initial check highlight update (e.g. for a loaded game in check) - though not strictly needed for new game.
