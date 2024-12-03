console.log('to na animação');
console.log(sessionStorage.CARGO_USUARIO);
const cargo = sessionStorage.CARGO_USUARIO; 
const iconMenuSideBar = document.getElementById("iconMenuSideBar");
const menuSideBar = document.getElementById("menuSideBar");
const home = document.getElementsByClassName("dashicon")[0];
const conta = document.getElementsByClassName("conta")[0];
const lembretes = document.getElementsByClassName("lembretes")[0];
const empresas = document.getElementsByClassName("empresas")[0]; 
let linkHome, linkConta, linkAcessos, linkEmpresas;
let h1Home, ContaHome, LembretesHome, EmpresasHome;

function displayEmpresas() {
    if (sessionStorage.EMPRESA_USUARIO === 'InfoTrack' && cargo === 'Administrador') {
        empresas.style.display = 'block';
        return true;
    } else {
        empresas.style.display = 'none';
        return false;
    }
}


function blockAcessos() {
    console.log("Cargo atual:", cargo);
    if (cargo === 'Administrador' || cargo === 'Gerente') {
        LembretesHome.style.display = 'block';
        lembretes.style.display = 'block'; 
        if (!LembretesHome.parentNode) {
            menuSideBar.appendChild(LembretesHome); 
        }
    } else {
    
        console.log("Removendo LembretesHome para Analista");
        LembretesHome.style.display = 'none'; 
        lembretes.remove();
        if (LembretesHome.parentNode) {
            LembretesHome.remove(); 
            
        }
    }
}

// Inicialização dos links
displayEmpresas();
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

// Função para alternar a exibição do menu
function toggleMenu() {
    if (menuSideBar.classList.contains("sobrepor")) {
        // Remove elementos do menu
        if (h1Home) h1Home.remove();
        if (ContaHome) ContaHome.remove();
        if (LembretesHome) LembretesHome.remove();
        if (EmpresasHome) EmpresasHome.remove();

        menuSideBar.classList.remove("sobrepor");
        home.style.display = "block";
        lembretes.style.display = "block";
        conta.style.display = "block";
        displayEmpresas();
    } else {
        menuSideBar.classList.add("sobrepor");

        // Criação dos elementos do menu
        if (!h1Home) {
            h1Home = document.createElement("a");
            h1Home.textContent = "Home";
            h1Home.classList.add("menuLink");
            h1Home.href = linkHome;
        }

        if (!ContaHome) {
            ContaHome = document.createElement("a");
            ContaHome.textContent = "Conta";
            ContaHome.classList.add("menuLink");
            ContaHome.href = linkConta;
        }

        // LembretesHome (Gerenciar Acessos) só deve ser criado se o cargo for 'Administrador' ou 'Gerente'
        if (!LembretesHome) {
            LembretesHome = document.createElement("a");
            LembretesHome.textContent = "Gerenciar Acessos";
            LembretesHome.classList.add("menuLink");
            LembretesHome.href = linkAcessos;
        }

        // EmpresasHome só deve ser criado e adicionado se o cargo for 'Administrador'
        if (!EmpresasHome) {
            EmpresasHome = document.createElement("a");
            EmpresasHome.textContent = "Gerenciar Empresas";
            EmpresasHome.classList.add("menuLink");
            EmpresasHome.href = linkEmpresas;
        }

        // Adiciona os elementos ao menu na ordem desejada
        if (!menuSideBar.contains(h1Home)) {
            menuSideBar.appendChild(h1Home);
        }
        if (!menuSideBar.contains(ContaHome)) {
            menuSideBar.appendChild(ContaHome);
        }

        blockAcessos(); // Chame a função para configurar a exibição de LembretesHome

        // Adiciona LembretesHome se estiver visível
        if (LembretesHome.style.display === 'block') {
            if (!menuSideBar.contains(LembretesHome)) {
                menuSideBar.appendChild(LembretesHome);
            }
        }

        // Adiciona EmpresasHome se estiver visível
        if (displayEmpresas()) {
            if (!menuSideBar.contains(EmpresasHome)) {
                menuSideBar.appendChild(EmpresasHome);
            }
        }

        // Esconde os elementos principais
        home.style.display = "none";
        lembretes.style.display = "none";
        conta.style.display = "none";
        empresas.style.display = "none";
    }
}

iconMenuSideBar.addEventListener("click", toggleMenu);