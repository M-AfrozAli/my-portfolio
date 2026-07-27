(function () {
  // ---------- Lanyard physics ----------
  const stage = document.getElementById("lanyardStage");
  const card = document.getElementById("lanyardCard");
  const rope = document.getElementById("ropePath");

  const state = {
    pivot: { x: 0, y: 22 },
    pos: { x: 0, y: 200 },
    prev: { x: 0, y: 200 },
    ropeLen: 200,
    cardW: 232,
    cardH: 300,
    dragging: false,
    grabOffset: { x: 0, y: 0 },
    downClient: { x: 0, y: 0 },
    moved: false,
    initialized: false,
  };

  function resize() {
    const rect = stage.getBoundingClientRect();
    const w = rect.width;
    let cw = 232, ch = 300;
    if (w < 420) { cw = 186; ch = 246; }
    else if (w < 640) { cw = 200; ch = 260; }
    state.cardW = cw;
    state.cardH = ch;
    state.pivot.x = rect.width / 2;
    state.pivot.y = 22;
    state.ropeLen = Math.min(rect.height - ch - 40, w < 480 ? 150 : 190);
    if (!state.initialized) {
      state.pos.x = state.pivot.x;
      state.pos.y = state.pivot.y + state.ropeLen;
      state.prev.x = state.pos.x;
      state.prev.y = state.pos.y;
      state.initialized = true;
    }
  }
  resize();
  new ResizeObserver(resize).observe(stage);

  function onMove(e) {
    if (!state.dragging) return;
    e.preventDefault();
    const rect = stage.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    state.pos.x = px - state.grabOffset.x;
    state.pos.y = py - state.grabOffset.y;
    if (Math.hypot(e.clientX - state.downClient.x, e.clientY - state.downClient.y) > 5) {
      state.moved = true;
    }
  }
  function onUp() {
    if (!state.dragging) return;
    state.dragging = false;
    if (!state.moved) card.classList.toggle("is-flipped");
  }
  window.addEventListener("pointermove", onMove, { passive: false });
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);

  card.addEventListener("pointerdown", function (e) {
    const rect = stage.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    state.dragging = true;
    state.moved = false;
    state.downClient = { x: e.clientX, y: e.clientY };
    state.grabOffset = { x: px - state.pos.x, y: py - state.pos.y };
    if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
  });

  function tick() {
    const s = state;
    if (!s.dragging) {
      const vx = (s.pos.x - s.prev.x) * 0.985;
      const vy = (s.pos.y - s.prev.y) * 0.985;
      s.prev.x = s.pos.x;
      s.prev.y = s.pos.y;
      s.pos.x += vx;
      s.pos.y += vy + 0.55; // gravity
    } else {
      s.prev.x = s.pos.x;
      s.prev.y = s.pos.y;
    }
    const dx = s.pos.x - s.pivot.x;
    const dy = s.pos.y - s.pivot.y;
    const dist = Math.hypot(dx, dy) || 0.0001;
    if (dist > s.ropeLen) {
      const k = s.ropeLen / dist;
      s.pos.x = s.pivot.x + dx * k;
      s.pos.y = s.pivot.y + dy * k;
    }
    const angleDeg = Math.atan2(s.pos.x - s.pivot.x, s.pos.y - s.pivot.y) * (180 / Math.PI);
    card.style.transform =
      "translate(" + (s.pos.x - s.cardW / 2) + "px, " + s.pos.y + "px) rotate(" + (-angleDeg) + "deg)";

    const sag = Math.min(30, (s.ropeLen - Math.hypot(dx, dy)) * -0.15 + 10);
    const mx = (s.pivot.x + s.pos.x) / 2;
    const my = (s.pivot.y + s.pos.y) / 2 + sag;
    rope.setAttribute("d", "M " + s.pivot.x + " " + s.pivot.y + " Q " + mx + " " + my + " " + s.pos.x + " " + s.pos.y);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // ---------- Nav scroll spy ----------
  const sections = document.querySelectorAll(".section");
  const navItems = document.querySelectorAll(".nav-item");
  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
    });
    navItems.forEach(function (item) {
      item.classList.toggle("active", item.getAttribute("href") === "#" + current);
    });
  }, { passive: true });

  // ---------- Project expander ----------
  const lanc = document.getElementById("lancCard");
  const closeBtn = document.getElementById("closeLancBtn");
  lanc.addEventListener("click", function () {
    if (!lanc.classList.contains("open")) lanc.classList.add("open");
  });
  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    lanc.classList.remove("open");
  });

  // ---------- Carousel placeholder ----------
  let slide = 0;
  const total = 5;
  const label = document.getElementById("slideLabel");
  function setSlide(i) {
    slide = (i + total) % total;
    label.textContent = "Media preview · slide " + (slide + 1) + " / " + total;
  }
  document.getElementById("prevSlide").addEventListener("click", function (e) { e.stopPropagation(); setSlide(slide - 1); });
  document.getElementById("nextSlide").addEventListener("click", function (e) { e.stopPropagation(); setSlide(slide + 1); });
})();
