
const iconMenuSideBar = document.getElementById("iconMenuSideBar");
const menuSideBar = document.getElementById("menuSideBar");
const home = document.getElementsByClassName("dashicon")[0];
const conta = document.getElementsByClassName("conta")[0];
const lembretes = document.getElementsByClassName("lembretes")[0];
const empresas = document.getElementsByClassName("empresas")[0];
let linkHome, linkConta, linkAcessos, linkEmpresas;
let h1Home, ContaHome, LembretesHome, EmpresasHome;

function displayEmpresas(){
    if(sessionStorage.EMPRESA_USUARIO == 'InfoTrack'){
        empresas.style.display = 'block'
        return true
    }
    else{
        empresas.style.display = 'none'
        return false
    }

    
}


function blockEmpresa(){
    EmpresasHome.style.display = 'block';

}
displayEmpresas()
if (window.location.pathname.endsWith("dashboard.html")) {
    linkHome = "#";
    linkConta = "../conta.html";
    linkAcessos = "../acessos.html";
    linkEmpresas = "../empresa.html";
} else {
    linkHome = "./dashboard/dashboard.html";
    linkConta = "conta.html";
    linkAcessos = "acessos.html";
    linkEmpresas = "empresa.html";
}





function toggleMenu() {
    if (menuSideBar.classList.contains("sobrepor")) {
      
        if (h1Home) h1Home.style.display = 'none';
        if (ContaHome) ContaHome.style.display = 'none';
        if (LembretesHome) LembretesHome.style.display = 'none';
        if (EmpresasHome) EmpresasHome.style.display = 'none';
        
        menuSideBar.classList.remove("sobrepor");
        home.style.display = "block";
        lembretes.style.display = "block";
        conta.style.display = "block";
        displayEmpresas()
    } else {
     
        menuSideBar.classList.add("sobrepor");
       
        if (!h1Home) {
            h1Home = document.createElement("a");
            h1Home.textContent = "Home";
            h1Home.classList.add("menuLink"); 
            h1Home.href = linkHome
        }
        
        if (!ContaHome) {
            ContaHome = document.createElement("a");
            ContaHome.textContent = "Conta";
            ContaHome.classList.add("menuLink"); 
            ContaHome.href = linkConta

        }
        
        if (!LembretesHome) {
            LembretesHome = document.createElement("a");
            LembretesHome.textContent = "Gerenciar Acessos";
            LembretesHome.classList.add("menuLink");
            LembretesHome.href = linkAcessos
        }

        if (!EmpresasHome && displayEmpresas()) {
            EmpresasHome = document.createElement("a");
            EmpresasHome.textContent = "Gerenciar Empresas";
            EmpresasHome.classList.add("menuLink");
            EmpresasHome.href = linkEmpresas
            blockEmpresa()
        }
        
      
        h1Home.style.display = 'block';
        ContaHome.style.display = 'block';
        LembretesHome.style.display = 'block';
       
        home.style.display = "none";
        lembretes.style.display = "none";
        conta.style.display = "none";
        empresas.style.display = "none";
    
        if (!menuSideBar.contains(h1Home)) {
            menuSideBar.appendChild(h1Home);
        }
        if (!menuSideBar.contains(ContaHome)) {
            menuSideBar.appendChild(ContaHome);
        }
        if (!menuSideBar.contains(LembretesHome)) {
            menuSideBar.appendChild(LembretesHome);
        }
        if (!menuSideBar.contains(EmpresasHome)) {
            menuSideBar.appendChild(EmpresasHome);
        }
    }
}

iconMenuSideBar.addEventListener("click", toggleMenu);











// Bairro	Total de Casos
// Sé	35.000
// Brás	30.000
// Liberdade	28.000
// Vila Madalena	25.000
// Mooca	22.000
// Itaim Bibi	20.000
// Tatuapé	18.000



// Resumo Visual:
// Período	Total de Casos
// Dia	180.000
// Noite	200.000
// Madrugada	56.035
