/* ── Countdown ── */
let prevValues = { days: null, hours: null, mins: null, secs: null };
const updateCountdown = () => {
  const target = new Date('2026-10-19T09:00:00');
  const now = new Date();
  const diff = target - now;
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;
  if (diff <= 0) {
    daysEl.textContent = '00'; hoursEl.textContent = '00';
    minsEl.textContent = '00'; secsEl.textContent = '00';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const next = {
    days: String(d).padStart(2, '0'),
    hours: String(h).padStart(2, '0'),
    mins: String(m).padStart(2, '0'),
    secs: String(s).padStart(2, '0')
  };
  [
    { key: 'days', el: daysEl, value: next.days },
    { key: 'hours', el: hoursEl, value: next.hours },
    { key: 'mins', el: minsEl, value: next.mins },
    { key: 'secs', el: secsEl, value: next.secs }
  ].forEach(({ key, el, value }) => {
    if (prevValues[key] !== value) {
      el.classList.remove('flip', 'pulse');
      void el.offsetWidth;
      el.classList.add('flip', 'pulse');
      el.textContent = value;
    }
  });
  prevValues = next;
};
updateCountdown();
setInterval(updateCountdown, 1000);

/* ── Scroll Reveal ── */
const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.transitionDelay = `${index * 80}ms`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach((el) => observer.observe(el));
}

/* ── Parallax on hero illustrations ── */
const heroWrap = document.querySelector('.hero-visual-wrap');
const bottle = document.querySelector('.floating-bottle');
const pill = document.querySelector('.floating-pill');
const resetFloating = () => {
  if (bottle) bottle.style.transform = '';
  if (pill) pill.style.transform = '';
};
window.addEventListener('mousemove', (event) => {
  if (!heroWrap || !bottle || !pill) return;
  const rect = heroWrap.getBoundingClientRect();
  const inBounds = event.clientX >= rect.left && event.clientX <= rect.right &&
                   event.clientY >= rect.top && event.clientY <= rect.bottom;
  if (!inBounds) { resetFloating(); return; }
  const relX = (event.clientX - rect.left) / rect.width - 0.5;
  const relY = (event.clientY - rect.top) / rect.height - 0.5;
  const moveX = Math.max(Math.min(relX * 18, 18), -18);
  const moveY = Math.max(Math.min(relY * 18, 18), -18);
  bottle.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  pill.style.transform = `translate3d(${moveX * 1.2}px, ${moveY * 1.2}px, 0) rotate(${moveX * 0.2}deg)`;
});

/* ── Tilt cards ── */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(6px)`;
    card.style.boxShadow = `${-x * 18}px ${y * 4 + 10}px 30px rgba(13,27,42,0.16), 0 2px 8px rgba(13,27,42,0.08)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});
