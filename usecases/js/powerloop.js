(function () {
    /* CURSOR */
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

    /* NAV SCROLL */
    var nav = document.getElementById("nav");
    window.addEventListener("scroll", function () {
      nav.classList.toggle("scrolled", scrollY > 60);
    });

    /* HERO PARALLAX */
    var heroBg = document.getElementById("heroBg");
    window.addEventListener("scroll", function () {
      if (heroBg)
        heroBg.style.transform =
          "translateY(" +
          Math.min(scrollY / window.innerHeight, 1) * 60 +
          "px)";
    });

    /* SCROLL REVEAL */
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".rv").forEach(function (el) {
      io.observe(el);
    });


    
  })();