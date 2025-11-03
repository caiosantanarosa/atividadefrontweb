import './router.js';

document.addEventListener('pageLoaded', (e) => {
  const page = e.detail;

  if (page === 'cadastro') initCadastro();
  if (page === 'projetos') mostrarCadastros();
  if (page === 'doacoes') initGraficoDoacoes();
});

function initCadastro() {
  const form = document.querySelector(".form");
  if (!form) return;

  const campos = form.querySelectorAll("input, select");

  campos.forEach(campo => {
    campo.addEventListener("input", () => validarCampo(campo));
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let valido = true;

    campos.forEach(campo => {
      if (!validarCampo(campo)) valido = false;
    });

    if (!valido) {
      alert("Corrija os erros antes de enviar ✅");
      return;
    }

    const dados = Object.fromEntries(new FormData(form));
    salvarCadastro(dados);
    location.hash = "#projetos";
  });
}


function validarCampo(campo) {
  const erroMsg = campo.nextElementSibling;
  let valor = campo.value.trim();
  let valido = true;
  let mensagem = "";

  switch (campo.name) {
    case "nome":
    case "endereco":
    case "bairro":
    case "cidade":
      if (valor.length < 3) {
        valido = false;
        mensagem = "Mínimo 3 caracteres.";
      }
      break;

    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(valor)) {
        valido = false;
        mensagem = "E-mail inválido.";
      }
      break;

    case "telefone":
      valor = valor.replace(/\D/g, '');
      if (valor.length < 10) {
        valido = false;
        mensagem = "Telefone incompleto.";
      }
      break;

    case "cpf":
      valor = valor.replace(/\D/g, '');
      if (!validaCPF(valor)) {
        valido = false;
        mensagem = "CPF inválido.";
      }
      break;

    case "cep":
      valor = valor.replace(/\D/g, '');
      if (valor.length !== 8) {
        valido = false;
        mensagem = "CEP inválido.";
      }
      break;

    case "estado":
      if (campo.value === "") {
        valido = false;
        mensagem = "Selecione seu estado.";
      }
      break;

    case "data":
      if (!validaData(valor)) {
        valido = false;
        mensagem = "Data inválida.";
      }
      break;
  }

  erroMsg.textContent = mensagem;
  campo.classList.toggle("erro", !valido);
  return valido;
}


function validaData(data) {
  const hoje = new Date();
  const nascimento = new Date(data);
  const idade = hoje.getFullYear() - nascimento.getFullYear();
  return (
    nascimento <= hoje && idade >= 12
  );
}

function validaCPF(cpf) {
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;

  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto >= 10) resto = 0;
  if (resto != parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto >= 10) resto = 0;

  return resto == parseInt(cpf[10]);
}

document.addEventListener("input", (e) => {
  const campo = e.target;

  if (campo.name === "cpf") {
    campo.value = campo.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{2})$/, "$1-$2");
  }

  if (campo.name === "telefone") {
    campo.value = campo.value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  if (campo.name === "cep") {
    campo.value = campo.value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }
});


function salvarCadastro(dados) {
  let lista = JSON.parse(localStorage.getItem('cadastros') || '[]');
  lista.push(dados);
  localStorage.setItem('cadastros', JSON.stringify(lista));
  alert("Cadastro salvo com sucesso!");
}

import Usuario from "./models/Usuario.js";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = new Usuario(
    nomeInput.value,
    emailInput.value,
    cpfInput.value,
    telefoneInput.value,
    dataInput.value,
    enderecoInput.value,
    bairroInput.value,
    cepInput.value,
    cidadeInput.value,
    estadoSelect.value,
  );

  console.log("Usuário criado:", usuario);
});



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
