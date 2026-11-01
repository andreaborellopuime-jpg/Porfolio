const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function aplicarTema(tema) {
  root.setAttribute('data-theme', tema);
  // En modo claro se muestra la luna (para pasar a oscuro); en oscuro, el sol
  const oscuro = tema === 'dark';
  themeIcon.src = oscuro ? 'img/icon-sol.png' : 'img/icon-luna.png';
  themeToggle.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  try { localStorage.setItem('tema', tema); } catch (e) { /* sin almacenamiento */ }
}

let temaGuardado = null;
try { temaGuardado = localStorage.getItem('tema'); } catch (e) {}
const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
aplicarTema(temaGuardado || (prefiereOscuro ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  aplicarTema(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

const contactToggle = document.getElementById('contactToggle');
const contactPanel = document.getElementById('contactPanel');

function cerrarContacto() {
  contactPanel.hidden = true;
  contactToggle.setAttribute('aria-expanded', 'false');
}

contactToggle.addEventListener('click', () => {
  const abrir = contactPanel.hidden;
  contactPanel.hidden = !abrir;
  contactToggle.setAttribute('aria-expanded', String(abrir));
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarContacto(); });
document.addEventListener('click', (e) => {
  if (!contactPanel.hidden && !contactPanel.contains(e.target) && !contactToggle.contains(e.target)) {
    cerrarContacto();
  }
});

const capturesToggle = document.getElementById('capturesToggle');
const capturesPanel = document.getElementById('capturesPanel');

capturesToggle.addEventListener('click', () => {
  const abierto = capturesPanel.classList.toggle('open');
  capturesToggle.setAttribute('aria-expanded', String(abierto));
});

document.getElementById('year').textContent = new Date().getFullYear();
