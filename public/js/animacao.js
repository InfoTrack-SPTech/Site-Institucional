let iconMenuSideBar = document.getElementById("iconMenuSideBar");
let menuSideBar = document.getElementById("menuSideBar");
let home = document.getElementsByClassName("dashicon")[0];
let conta = document.getElementsByClassName("conta")[0];
let lembretes = document.getElementsByClassName("lembretes")[0];

function click() {
if (menuSideBar.classList[1] == "sobrepor") {
    h1Home.style.display = 'none'
    ContaHome.style.display = 'none'
    LembretesHome.style.display = 'none'
    menuSideBar.classList.remove("sobrepor");
    home.style.display = "block";
    lembretes.style.display = "block";
    conta.style.display = "block";
} else {
    menuSideBar.classList.add("sobrepor");
    h1Home = document.createElement("a");
    ContaHome = document.createElement("a");
    LembretesHome = document.createElement("a");
    h1Home.textContent = "Home";
    ContaHome.textContent = "Conta";
    LembretesHome.textContent = "Lembretes";
    home.style.display = "none";
    lembretes.style.display = "none";
    conta.style.display = "none";
    menuSideBar.appendChild(h1Home);
    menuSideBar.appendChild(ContaHome);
    menuSideBar.appendChild(LembretesHome);
    }
}

iconMenuSideBar.addEventListener("click", click);
