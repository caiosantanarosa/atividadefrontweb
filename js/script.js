let menu = document.querySelector('.menu');

function abreMenu(){
    if(menu.style.display === 'flex' && window.innerWidth <= 750){
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    } 
}