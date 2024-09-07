let menu = document.getElementById('navmenuL')
let menuMobile = document.querySelector('.mobile')
console.log(menuMobile)
const larguraDaTela = window.innerWidth;
console.log(larguraDaTela);

if(larguraDaTela <= 1080) {
  menu.style.display = 'none'
  menuMobile.style.display = 'flex'

  console.log('deu certo?')
} else {
  menu.style.display = 'flex'
  menuMobile.style.display = 'none'
}

window.onload = function() {
  handleScroll(); 
};




window.onscroll = function() {
  handleScroll();
};

function handleScroll() {
  var header = document.getElementById("header");
  if (window.pageYOffset > 50) {
      header.style.backgroundColor = "#3a1b1be6";
  } else {
      header.style.backgroundColor = "#000";
  }
}

