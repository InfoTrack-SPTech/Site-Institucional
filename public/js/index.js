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

AOS.init();
