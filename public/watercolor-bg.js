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
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
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
      background: #030816;
      overflow: hidden;
    }
    #jt-watercolor-canvas .jt-blob {
      position: absolute;
      filter: blur(44px);
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
    var blues = ['#38BDF8', '#0EA5E9', '#0284C7', '#0369A1', '#075985', '#082F49', '#1E3A8A'];
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
      d.style.mixBlendMode = 'screen';
      d.style.borderRadius =
        rand(40, 60) + '% ' + rand(40, 60) + '% ' + rand(40, 60) + '% ' + rand(40, 60) + '% / ' +
        rand(40, 60) + '% ' + rand(40, 60) + '% ' + rand(40, 60) + '% ' + rand(40, 60) + '%';
      d.style.transform = 'rotate(' + rand(0, 360) + 'deg)';
      host.appendChild(d);
    }

    var cols = Math.max(3, Math.ceil(w / 350));
    var rows = Math.max(3, Math.ceil(h / 350));
    var cellW = w / cols, cellH = h / rows;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        if (rand(0, 1) < 0.85) {
          var cx = cellW * c + cellW * rand(0.1, 0.9);
          var cy = cellH * r + cellH * rand(0.1, 0.9);
          // High opacity and larger sizes for clear smudges
          shape(cx, cy, rand(300, 600), pick(blues, 0, 7), rand(0.3, 0.6));
        }
      }
    }
    
    // Add some massive dark background washes
    for(var i=0; i<4; i++) {
        shape(rand(0, w), rand(0, h), rand(800, 1200), pick(blues, 4, 7), rand(0.1, 0.2));
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
