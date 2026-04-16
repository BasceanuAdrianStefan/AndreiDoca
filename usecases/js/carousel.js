function initCarousel(
    wrapId,
    trackId,
    dotsId,
    counterId,
    progressId,
    slidesPerView
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
    var spv = slidesPerView || 1; // visible slides at once
    var maxIdx = total - spv; // last valid index

    // Build dots
    for (var i = 0; i < total; i++) {
      var d = document.createElement("button");
      d.className = "car-dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", "Slide " + (i + 1));
      (function (idx) {
        d.addEventListener("click", function () {
          go(idx);
        });
      })(i);
      dotsEl.appendChild(d);
    }

    // Build progress fill if element exists
    var fill = null;
    if (progEl) {
      fill = document.createElement("div");
      fill.className = "car-progress-fill";
      progEl.appendChild(fill);
    }

    function getSlideWidth() {
      // total slide width including gap
      if (slides.length === 0) return 0;
      var s = slides[0];
      var style = window.getComputedStyle(track);
      var gap = parseFloat(style.gap) || 20;
      return s.offsetWidth + gap;
    }

    function go(n) {
      n = Math.max(0, Math.min(n, maxIdx));
      cur = n;
      var offset = cur * getSlideWidth();
      track.style.transform = "translateX(-" + offset + "px)";

      // dots
      var allDots = dotsEl.querySelectorAll(".car-dot");
      allDots.forEach(function (d, i) {
        d.classList.toggle("active", i === cur);
      });

      // counter
      if (cntEl) cntEl.textContent = cur + 1 + " / " + total;

      // progress bar
      if (fill) fill.style.width = ((cur + spv) / total) * 100 + "%";

      // disable buttons at edges
      var prev = wrap.querySelector(".car-prev");
      var next = wrap.querySelector(".car-next");
      if (prev) prev.disabled = cur === 0;
      if (next) next.disabled = cur >= maxIdx;
    }

    // Arrow buttons
    wrap
      .querySelector(".car-prev")
      .addEventListener("click", function () {
        go(cur - 1);
      });
    wrap
      .querySelector(".car-next")
      .addEventListener("click", function () {
        go(cur + 1);
      });

    // Touch / drag support
    var startX = 0,
      isDragging = false;
    track.addEventListener("mousedown", function (e) {
      startX = e.clientX;
      isDragging = true;
    });
    track.addEventListener(
      "touchstart",
      function (e) {
        startX = e.touches[0].clientX;
        isDragging = true;
      },
      { passive: true }
    );
    track.addEventListener("mousemove", function (e) {
      if (isDragging) e.preventDefault();
    });
    track.addEventListener("mouseup", function (e) {
      if (!isDragging) return;
      isDragging = false;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 50) go(dx < 0 ? cur + 1 : cur - 1);
    });
    track.addEventListener("touchend", function (e) {
      if (!isDragging) return;
      isDragging = false;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) go(dx < 0 ? cur + 1 : cur - 1);
    });

    // Keyboard
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(cur - 1);
      if (e.key === "ArrowRight") go(cur + 1);
    });

    // Auto-advance
    var timer = setInterval(function () {
      go(cur < maxIdx ? cur + 1 : 0);
    }, 5000);
    wrap.addEventListener("mouseenter", function () {
      clearInterval(timer);
    });
    wrap.addEventListener("mouseleave", function () {
      timer = setInterval(function () {
        go(cur < maxIdx ? cur + 1 : 0);
      }, 5000);
    });

    // Init
    go(0);
  }

  // Desktop carousel — 1 slide visible
  initCarousel(
    "desktopCar",
    "desktopTrack",
    "desktopDots",
    "desktopCounter",
    null,
    1
  );

  // Mobile carousel — 3 phones visible, step by 1
  initCarousel(
    "mobileCar",
    "mobileTrack",
    "mobileDots",
    "mobileCounter",
    null,
    3
  );