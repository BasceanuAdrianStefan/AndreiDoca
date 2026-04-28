function initCarousel(
  wrapId, trackId, dotsId, counterId, progressId, slidesPerView, centerFocus
) {
  var wrap = document.getElementById(wrapId);
  var track = document.getElementById(trackId);
  var dotsEl = document.getElementById(dotsId);
  var cntEl = document.getElementById(counterId);
  var progEl = progressId ? document.getElementById(progressId) : null;

  if (!wrap || !track) return;

  var slides = track.children;
  var total = slides.length;
  var cur = 0;
  var spv = slidesPerView || 1;
  var maxIdx = centerFocus ? total - 1 : total - spv;

  // Build dots
  for (var i = 0; i < total; i++) {
    var d = document.createElement("button");
    d.className = "car-dot" + (i === 0 ? " active" : "");
    d.setAttribute("aria-label", "Slide " + (i + 1));
    (function (idx) { d.addEventListener("click", function () { go(idx); }); })(i);
    dotsEl.appendChild(d);
  }

  // Build progress fill
  var fill = null;
  if (progEl) {
    fill = document.createElement("div");
    fill.className = "car-progress-fill";
    progEl.appendChild(fill);
  }

  function getSlideWidth() {
    if (slides.length === 0) return 0;
    var style = window.getComputedStyle(track);
    var gap = parseFloat(style.gap) || 20;
    return slides[0].offsetWidth + gap;
  }

  function go(n) {
    n = Math.max(0, Math.min(n, maxIdx));
    cur = n;

    var offset;
    if (centerFocus) {
      var sw = getSlideWidth();
      var wrapWidth = wrap.offsetWidth;
      var slideVisualWidth = slides[0].offsetWidth;
      var padding = parseFloat(window.getComputedStyle(wrap).paddingLeft) || 0;
      offset = (cur * sw) - (wrapWidth / 2) + (slideVisualWidth / 2) + padding;
      offset = Math.max(0, offset);
    } else {
      offset = cur * getSlideWidth();
    }

    track.style.transform = "translateX(-" + offset + "px)";

    // Active class on slides (for centerFocus)
    if (centerFocus) {
      Array.from(slides).forEach(function (s, i) {
        s.classList.toggle("active", i === cur);
      });
    }

    // Dots
    var allDots = dotsEl.querySelectorAll(".car-dot");
    allDots.forEach(function (d, i) { d.classList.toggle("active", i === cur); });

    // Counter
    if (cntEl) cntEl.textContent = (cur + 1) + " / " + total;

    // Progress
    if (fill) fill.style.width = ((cur + (centerFocus ? 1 : spv)) / total) * 100 + "%";

    // Edge buttons
    var prev = wrap.querySelector(".car-prev");
    var next = wrap.querySelector(".car-next");
    if (prev) prev.disabled = cur === 0;
    if (next) next.disabled = cur >= maxIdx;
  }

  wrap.querySelector(".car-prev").addEventListener("click", function () { go(cur - 1); });
  wrap.querySelector(".car-next").addEventListener("click", function () { go(cur + 1); });

  // Touch / drag
  var startX = 0, isDragging = false;
  track.addEventListener("mousedown", function (e) { startX = e.clientX; isDragging = true; });
  track.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; isDragging = true; }, { passive: true });
  track.addEventListener("mousemove", function (e) { if (isDragging) e.preventDefault(); });
  track.addEventListener("mouseup", function (e) {
    if (!isDragging) return; isDragging = false;
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 50) go(dx < 0 ? cur + 1 : cur - 1);
  });
  track.addEventListener("touchend", function (e) {
    if (!isDragging) return; isDragging = false;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) go(dx < 0 ? cur + 1 : cur - 1);
  });

 

  

  go(0);
}

// Desktop — 1 slide, normal mode
initCarousel("desktopCar", "desktopTrack", "desktopDots", "desktopCounter", null, 1, false);

// Mobile — center-focus mode
initCarousel("mobileCar", "mobileTrack", "mobileDots", "mobileCounter", null, 3, true);