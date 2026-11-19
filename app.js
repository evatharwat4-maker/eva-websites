// Eva Websites v5: header state, reveal on scroll, counters, hero parallax, floating button.
// Only transform/opacity. Everything is visible without JS or with reduced motion.
(() => {
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = document.querySelector('.top');
  const fab = document.querySelector('.fab');
  const hero = document.querySelector('.hero');
  const par = document.querySelector('[data-par]');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      top.classList.toggle('scrolled', y > 8);
      fab.classList.toggle('on', y > hero.offsetHeight * .6);
      if (par && !rm && y < hero.offsetHeight * 1.2) par.style.transform = `translate3d(0, ${(-Math.min(y * .06, 50)).toFixed(1)}px, 0)`;
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const items = document.querySelectorAll('.rv');
  const count = el => {
    const to = +el.dataset.to, suf = el.dataset.suf || '', t0 = performance.now(), dur = 1400;
    const step = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(to * e) + suf; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  if (rm || !('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-to]').forEach(count);
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: .12 });
  items.forEach(el => io.observe(el));
})();
