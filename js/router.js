// router.js - Controle das páginas SPA
const view = document.getElementById('view');

const routes = {
  '': 'home',
  'home': 'home',
  'cadastro': 'cadastro',
  'projetos': 'projetos',
  'doacoes': 'doacoes'
};

async function loadPage() {
  let hash = location.hash.replace('#', '');
  let page = routes[hash] || 'home';

  const resp = await fetch(`pages/${page}.html`);
  const html = await resp.text();

  view.innerHTML = html;

  // Dispara evento para inicializar JS da página carregada
  document.dispatchEvent(new CustomEvent('pageLoaded', { detail: page }));
}

window.addEventListener('hashchange', loadPage);
window.addEventListener('load', loadPage);
