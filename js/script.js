// 3D-mode toggle: on → boost → off → on. Persisted so a visitor's choice sticks.
(function () {
  var STATES = ["on", "boost", "off"];
  var btn = document.getElementById("toggle-3d");
  if (!btn) return;

  function apply(state) {
    document.body.setAttribute("data-3d", state);
    btn.textContent = "🕶 3D: " + state;
    try { localStorage.setItem("mode3d", state); } catch (e) { /* private mode */ }
  }

  var saved = null;
  try { saved = localStorage.getItem("mode3d"); } catch (e) { /* private mode */ }
  if (STATES.indexOf(saved) !== -1) apply(saved);

  btn.addEventListener("click", function () {
    var current = document.body.getAttribute("data-3d");
    var next = STATES[(STATES.indexOf(current) + 1) % STATES.length];
    apply(next);
  });
})();

// Scroll-spy: highlight the nav link of the section in view.
(function () {
  if (!("IntersectionObserver" in window)) return;
  var links = document.querySelectorAll('.nav-link[href^="#"]');
  var byId = {};
  links.forEach(function (link) { byId[link.getAttribute("href").slice(1)] = link; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (l) { l.classList.remove("active"); });
      var link = byId[entry.target.id];
      if (link) link.classList.add("active");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  ["about", "resume", "projects"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
