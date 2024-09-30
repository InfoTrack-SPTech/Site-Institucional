let iconMenuSideBar = document.getElementById('iconMenuSideBar')
let menuSideBar = document.getElementById('menuSideBar')


function click() {
    menuSideBar.classList.toggle('sobrepor')
}


iconMenuSideBar.addEventListener("click", click)
console.log(menuSideBar)