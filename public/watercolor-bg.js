(function () {
  var style = document.createElement('style');
  style.textContent = `
    .jt-watercolor-bg {
      position: relative;
      background: transparent;
    }
    .jt-watercolor-bg h1,
    .jt-watercolor-bg h2,
    .jt-watercolor-bg h3,
    .jt-watercolor-bg .jt-heading {
      font-family: var(--font-heading), sans-serif;
      font-weight: 700;
      position: relative;
      z-index: 1;
    }
    .jt-watercolor-bg p,
    .jt-watercolor-bg li,
    .jt-watercolor-bg span,
    .jt-watercolor-bg .jt-body {
      font-family: var(--font-body), sans-serif;
      font-weight: 400;
      position: relative;
      z-index: 1;
    }
    .jt-pill {
      display: inline-block;
      background: #FBFBF9;
      border-radius: 999px;
      padding: 0.5em 1.25em;
      position: relative;
      z-index: 1;
    }
    #jt-watercolor-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: -10;
      background: #F6F6F3;
      overflow: hidden;
    }
    #jt-watercolor-canvas .jt-blob {
      position: absolute;
      filter: blur(34px);
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  function jtPaintWatercolorBg() {
    var host = document.getElementById('jt-watercolor-canvas');
    if (!host) {
      host = document.createElement('div');
      host.id = 'jt-watercolor-canvas';
      document.body.insertBefore(host, document.body.firstChild);
    } else {
      host.innerHTML = '';
    }

    var w = window.innerWidth;
    var h = window.innerHeight;
    var blues = ['#EAF7F9', '#D7F0F4', '#C0E7EE', '#A4DBE6', '#83CBDC', '#5FB9D2', '#3FA5C7'];
    var rand = function (a, b) { return a + Math.random() * (b - a); };
    var pick = function (arr, lo, hi) { return arr[Math.floor(rand(lo, hi))]; };

    function shape(x, y, size, color, opacity) {
      var d = document.createElement('div');
      d.className = 'jt-blob';
      var w1 = size * rand(0.85, 1.3), h1 = size * rand(0.85, 1.3);
      d.style.width = w1 + 'px';
      d.style.height = h1 + 'px';
      d.style.left = (x - w1 / 2) + 'px';
      d.style.top = (y - h1 / 2) + 'px';
      d.style.background = color;
      d.style.opacity = opacity;
      d.style.mixBlendMode = 'multiply';
      d.style.borderRadius =
        rand(40, 60) + '% ' + rand(40, 60) + '% ' + rand(40, 60) + '% ' + rand(40, 60) + '% / ' +
        rand(40, 60) + '% ' + rand(40, 60) + '% ' + rand(40, 60) + '% ' + rand(40, 60) + '%';
      d.style.transform = 'rotate(' + rand(0, 360) + 'deg)';
      host.appendChild(d);
    }

    var cols = Math.max(3, Math.ceil(w / 300));
    var rows = Math.max(3, Math.ceil(h / 300));
    var cellW = w / cols, cellH = h / rows;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        if (rand(0, 1) < 0.72) {
          var cx = cellW * c + cellW * rand(0.15, 0.85);
          var cy = cellH * r + cellH * rand(0.15, 0.85);
          shape(cx, cy, rand(200, 450), pick(blues, 0, 7), rand(0.15, 0.35));
        }
      }
    }
  }

  // Run as soon as script executes
  setTimeout(jtPaintWatercolorBg, 0);

  window.jtPaintWatercolorBg = jtPaintWatercolorBg;
  window.addEventListener('resize', function() {
    clearTimeout(window.jtResizeTimeout);
    window.jtResizeTimeout = setTimeout(jtPaintWatercolorBg, 250);
  });
})();
