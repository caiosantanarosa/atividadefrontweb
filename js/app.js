// app.js - Funções gerais da aplicação
import './router.js';

document.addEventListener('pageLoaded', (e) => {
  const page = e.detail;
  
  if (page === 'cadastro') initCadastro();
  if (page === 'projetos') mostrarCadastros();
});

function initCadastro() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const dados = Object.fromEntries(new FormData(form));

    if (dados.nome.length < 3) {
      alert('Nome deve ter ao menos 3 caracteres');
      return;
    }

    let lista = JSON.parse(localStorage.getItem('cadastros') || '[]');
    lista.push(dados);
    localStorage.setItem('cadastros', JSON.stringify(lista));

    alert('Cadastro salvo com sucesso!');
    location.hash = '#projetos';
  });
}

function mostrarCadastros() {
  const listaDiv = document.querySelector('#lista');
  if (!listaDiv) return;

  let lista = JSON.parse(localStorage.getItem('cadastros') || '[]');

  if (lista.length === 0) {
    listaDiv.innerHTML = '<p>Nenhum cadastro encontrado.</p>';
    return;
  }

  listaDiv.innerHTML = lista
    .map(p => `<div class="item">${p.nome} - ${p.email}</div>`)
    .join('');
}
