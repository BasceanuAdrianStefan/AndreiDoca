/* Cursour script*/
(function () {
  var cur = document.getElementById("cur"),
    fol = document.getElementById("fol");
  var mx = 0,
    my = 0,
    fx = 0,
    fy = 0;
  document.addEventListener("mousemove", function (e) {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  });

  (function t() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    fol.style.left = fx + "px";
    fol.style.top = fy + "px";
    requestAnimationFrame(t);
  })();

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.getElementById("siteNav");
    if (!nav) return;
  
    window.addEventListener("scroll", function () {
      nav.classList.toggle("scrolled", scrollY > 60);
    });
  });
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".rv").forEach(function (el) {
    io.observe(el);
  });
  var secs = document.querySelectorAll("section[id]"),
    nls = document.querySelectorAll(".nav-links a");
  window.addEventListener("scroll", function () {
    var c = "";
    secs.forEach(function (s) {
      if (scrollY >= s.offsetTop - 140) c = s.id;
    });
    nls.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + c);
    });
  });
  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      var f = btn.dataset.filter;
      document.querySelectorAll(".project-card").forEach(function (c) {
        c.style.display = f === "all" || c.dataset.category === f ? "" : "none";
      });
    });
  });
  document.querySelectorAll(".project-card").forEach(function (c) {
    c.addEventListener("click", function () {
      var h = c.dataset.href;
      if (h) window.open(h, "_blank");
    });
  });
  // ACCORDION
  document.querySelectorAll(".acc-header").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc-item");
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".acc-item").forEach(function (i) {
        i.classList.remove("open");
        i.querySelector(".acc-body").style.maxHeight = "0";
        i.querySelector(".acc-header").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        var body = item.querySelector(".acc-body");
        body.style.maxHeight = body.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
  var firstItem = document.querySelector(".acc-item.open");
  if (firstItem) {
    var b = firstItem.querySelector(".acc-body");
    b.style.maxHeight = b.scrollHeight + "px";
  }
  // CAROUSEL
  var slides = document.querySelectorAll(".c-slide"),
    dotsWrap = document.getElementById("cDots"),
    cur2 = 0;
  slides.forEach(function (_, i) {
    var d = document.createElement("button");
    d.className = "c-dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", function () {
      goTo(i);
    });
    dotsWrap.appendChild(d);
  });
  function goTo(n) {
    slides[cur2].classList.remove("active");
    dotsWrap.children[cur2].classList.remove("active");
    cur2 = (n + slides.length) % slides.length;
    slides[cur2].classList.add("active");
    dotsWrap.children[cur2].classList.add("active");
  }
  document.getElementById("cPrev").addEventListener("click", function () {
    goTo(cur2 - 1);
  });
  document.getElementById("cNext").addEventListener("click", function () {
    goTo(cur2 + 1);
  });
  setInterval(function () {
    goTo(cur2 + 1);
  }, 7000);
})();
