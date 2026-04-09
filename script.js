// GSAP Animation Lab
(() => {
  gsap.registerPlugin(ScrollTrigger, Flip, MotionPathPlugin);

  // Optional SplitText support fallback
  const hasSplitText = typeof SplitText !== "undefined";

  // Global controls
  const speed = document.getElementById("globalSpeed");
  const speedValue = document.getElementById("speedValue");
  const debugScale = document.getElementById("debugScale");
  speed.addEventListener("input", () => {
    const v = parseFloat(speed.value);
    gsap.globalTimeline.timeScale(v);
    speedValue.textContent = `${v.toFixed(1)}x`;
    debugScale.textContent = v.toFixed(1);
  });

  // Debug panel
  const activeTweensEl = document.getElementById("activeTweens");
  gsap.ticker.add(() => {
    activeTweensEl.textContent = gsap.globalTimeline.getChildren(true, true, true).filter(t => t.isActive()).length;
  });

  // 1) Basic tweens
  const basicBox = document.getElementById("basicBox");
  const runBasic = (type) => {
    gsap.killTweensOf(basicBox);
    if (type === "to") gsap.to(basicBox, { x: 180, y: 20, rotation: 180, scale: 1.3, opacity: 0.4, duration: 1 });
    if (type === "from") gsap.from(basicBox, { x: -160, y: 50, rotation: -120, scale: 0.2, opacity: 0.1, duration: 1 });
    if (type === "fromTo") gsap.fromTo(basicBox, { x: 0, y: 0, scale: 0.5, rotation: 0, opacity: 0.3 }, { x: 220, y: -20, scale: 1.2, rotation: 270, opacity: 1, duration: 1.2 });
    if (type === "reset") gsap.to(basicBox, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.6 });
  };
  document.querySelectorAll("[data-basic]").forEach(btn => btn.addEventListener("click", () => runBasic(btn.dataset.basic)));

  // 2) Timeline demo
  const timelineProgress = document.getElementById("timelineProgress");
  const tl = gsap.timeline({ paused: true, defaults: { duration: 0.8, ease: "power2.inOut" } });
  tl.to(".d1", { x: 280, y: -48 })
    .to(".d2", { x: 240, y: 48 }, "-=0.4")
    .to(".d3", { x: 200, y: -12 }, "+=0.25")
    .to(".d1,.d2,.d3", { x: 0, y: 0, stagger: 0.06, duration: 0.6 });
  tl.eventCallback("onUpdate", () => timelineProgress.style.width = `${Math.round(tl.progress() * 100)}%`);
  document.getElementById("playTimeline").addEventListener("click", () => tl.restart());

  // 3) Easing
  document.getElementById("runEase").addEventListener("click", () => {
    const ease = document.getElementById("easeSelect").value;
    gsap.fromTo("#easeBall", { x: 0 }, { x: 360, duration: 1.4, ease, yoyo: true, repeat: 1 });
  });

  // 4) Stagger
  const grid = document.getElementById("staggerGrid");
  for (let i = 0; i < 40; i++) {
    const div = document.createElement("div");
    grid.appendChild(div);
  }
  document.getElementById("runStagger").addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("staggerAmount").value);
    const each = parseFloat(document.getElementById("staggerEach").value);
    const from = document.getElementById("staggerFrom").value;
    gsap.fromTo("#staggerGrid div", { scale: 0.5, opacity: 0.2 }, { scale: 1, opacity: 1, duration: 0.6, stagger: { amount, each, from }, ease: "power2.out" });
  });

  // 5) ScrollTrigger
  gsap.to(".scroll-fade", { opacity: 1, y: 0, duration: 0.9, scrollTrigger: { trigger: ".scroll-fade", start: "top 85%" } });
  gsap.to(".parallax-layer", { yPercent: -20, ease: "none", scrollTrigger: { trigger: ".parallax-wrap", scrub: true } });
  ScrollTrigger.create({ trigger: ".pin-wrap", start: "top top", end: "+=500", pin: ".pin-card", scrub: true });
  gsap.to(".scrub-dot", { x: 700, ease: "none", scrollTrigger: { trigger: ".scrub-wrap", start: "top center", end: "bottom center", scrub: true } });

  // 6) Advanced plugins
  document.getElementById("runSplit").addEventListener("click", () => {
    const target = document.getElementById("splitTarget");
    if (hasSplitText) {
      target.innerHTML = "Premium motion starts with intentional typography.";
      const split = new SplitText(target, { type: "chars,words" });
      gsap.from(split.chars, { y: 24, opacity: 0, duration: 0.6, stagger: 0.02, ease: "power2.out" });
    } else {
      const words = target.textContent.split(" ").map(w => `<span class=\"word\">${w}</span>`).join(" ");
      target.innerHTML = words;
      gsap.from("#splitTarget .word", { y: 16, opacity: 0, duration: 0.5, stagger: 0.04 });
    }
  });

  document.getElementById("runFlip").addEventListener("click", () => {
    const container = document.getElementById("flipContainer");
    const state = Flip.getState(".flip-item");
    const items = gsap.utils.toArray(".flip-item").sort(() => Math.random() - 0.5);
    items.forEach(item => container.appendChild(item));
    Flip.from(state, { duration: 0.8, ease: "power2.inOut", stagger: 0.03, absolute: true });
  });

  document.getElementById("runPath").addEventListener("click", () => {
    gsap.to("#pathFollower", {
      duration: 2,
      ease: "power1.inOut",
      motionPath: { path: "#motionCurve", align: "#motionCurve", autoRotate: true, alignOrigin: [0.5, 0.5] }
    });
  });

  // 7) Custom effects
  gsap.registerEffect({
    name: "fade",
    effect: (targets, config) => gsap.fromTo(targets, { opacity: 0 }, { opacity: 1, duration: config.duration, ease: config.ease }),
    defaults: { duration: 0.6, ease: "power1.out" },
    extendTimeline: true
  });
  gsap.registerEffect({
    name: "slideUp",
    effect: (targets, config) => gsap.fromTo(targets, { y: config.y, opacity: 0 }, { y: 0, opacity: 1, duration: config.duration }),
    defaults: { y: 18, duration: 0.6 },
    extendTimeline: true
  });
  gsap.registerEffect({
    name: "scaleIn",
    effect: (targets, config) => gsap.fromTo(targets, { scale: config.from, opacity: 0 }, { scale: 1, opacity: 1, duration: config.duration, ease: "back.out(1.6)" }),
    defaults: { from: 0.6, duration: 0.7 },
    extendTimeline: true
  });
  document.getElementById("runEffects").addEventListener("click", () => {
    gsap.effects.fade(".e1", { duration: 0.4 });
    const etl = gsap.timeline();
    etl.slideUp(".e2").scaleIn(".e3", {}, "-=0.25");
  });

  // 8) Interaction-based
  gsap.utils.toArray(".interactive").forEach(el => {
    el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.05, y: -2, duration: 0.2 }));
    el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1, y: 0, duration: 0.2 }));
  });
  document.getElementById("clickPulse").addEventListener("click", (e) => {
    gsap.fromTo(e.currentTarget, { scale: 0.92 }, { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.4)" });
  });

  // 9) Performance + utilities
  const cursorArea = document.getElementById("cursorArea");
  const dot = document.getElementById("cursorDot");
  const xTo = gsap.quickTo(dot, "x", { duration: 0.2, ease: "power3" });
  const yTo = gsap.quickTo(dot, "y", { duration: 0.2, ease: "power3" });
  cursorArea.addEventListener("mousemove", (e) => {
    const rect = cursorArea.getBoundingClientRect();
    xTo(e.clientX - rect.left - 9);
    yTo(e.clientY - rect.top - 9);
  });

  const perfBall = document.getElementById("perfBall");
  const setX = gsap.quickSetter(perfBall, "x", "px");
  const perfStage = document.getElementById("perfStage");
  perfStage.addEventListener("mousemove", (e) => {
    const rect = perfStage.getBoundingClientRect();
    const clamped = gsap.utils.clamp(0, rect.width - 40, e.clientX - rect.left);
    setX(clamped);
  });
  document.getElementById("runUtils").addEventListener("click", () => {
    const random = gsap.utils.random(10, 90, 1)();
    const clamped = gsap.utils.clamp(0, 100, random + 22);
    const mapped = gsap.utils.mapRange(0, 100, 0, 1, clamped);
    document.getElementById("utilsReadout").textContent = `random=${random}, clamp=${clamped}, mapRange=${mapped.toFixed(2)}`;
  });

  // 10) Responsive with matchMedia
  const mm = gsap.matchMedia();
  mm.add("(min-width: 901px)", () => {
    document.getElementById("responsiveReadout").textContent = "Desktop mode animation active";
    gsap.to("#responsiveBox", { x: 300, rotation: 180, repeat: -1, yoyo: true, duration: 2, ease: "sine.inOut" });
  });
  mm.add("(max-width: 900px)", () => {
    document.getElementById("responsiveReadout").textContent = "Mobile mode animation active";
    gsap.to("#responsiveBox", { y: 90, scale: 0.7, repeat: -1, yoyo: true, duration: 1.3, ease: "power1.inOut" });
  });

  // Play all
  document.getElementById("playAll").addEventListener("click", () => {
    runBasic("to");
    tl.restart();
    document.getElementById("runEase").click();
    document.getElementById("runStagger").click();
    document.getElementById("runSplit").click();
    document.getElementById("runPath").click();
    document.getElementById("runEffects").click();
    document.getElementById("runFlip").click();
  });
})();
