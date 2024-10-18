
const iconMenuSideBar = document.getElementById("iconMenuSideBar");
const menuSideBar = document.getElementById("menuSideBar");
const home = document.getElementsByClassName("dashicon")[0];
const conta = document.getElementsByClassName("conta")[0];
const lembretes = document.getElementsByClassName("lembretes")[0];

let h1Home, ContaHome, LembretesHome;


function toggleMenu() {
    if (menuSideBar.classList.contains("sobrepor")) {
      
        if (h1Home) h1Home.style.display = 'none';
        if (ContaHome) ContaHome.style.display = 'none';
        if (LembretesHome) LembretesHome.style.display = 'none';
        
        menuSideBar.classList.remove("sobrepor");
        home.style.display = "block";
        lembretes.style.display = "block";
        conta.style.display = "block";
    } else {
     
        menuSideBar.classList.add("sobrepor");
       
        if (!h1Home) {
            h1Home = document.createElement("a");
            h1Home.textContent = "Home";
            h1Home.classList.add("menuLink"); 
        }
        
        if (!ContaHome) {
            ContaHome = document.createElement("a");
            ContaHome.textContent = "Conta";
            ContaHome.classList.add("menuLink");
        }
        
        if (!LembretesHome) {
            LembretesHome = document.createElement("a");
            LembretesHome.textContent = "Lembretes";
            LembretesHome.classList.add("menuLink");
        }
        
      
        h1Home.style.display = 'block';
        ContaHome.style.display = 'block';
        LembretesHome.style.display = 'block';
        
       
        home.style.display = "none";
        lembretes.style.display = "none";
        conta.style.display = "none";
        
    
        if (!menuSideBar.contains(h1Home)) {
            menuSideBar.appendChild(h1Home);
        }
        if (!menuSideBar.contains(ContaHome)) {
            menuSideBar.appendChild(ContaHome);
        }
        if (!menuSideBar.contains(LembretesHome)) {
            menuSideBar.appendChild(LembretesHome);
        }
    }
}

iconMenuSideBar.addEventListener("click", toggleMenu);
