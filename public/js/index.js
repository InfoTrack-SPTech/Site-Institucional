
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active'); 
}

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}



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

