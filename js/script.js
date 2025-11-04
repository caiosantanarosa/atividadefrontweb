let menu = document.querySelector('.menu');

function abreMenu(){
    if(menu.style.display === 'flex' && window.innerWidth <= 750){
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    } 
}

document.addEventListener('DOMContentLoaded', () => {
    const contrastToggle = document.getElementById('botao-modo-contraste');
    const darkModeToggle = document.getElementById('botao-modo-escuro');

    if (contrastToggle) {
        contrastToggle.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            // Salvar preferência no localStorage
        });
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            // Salvar preferência no localStorage
        });
    }
});