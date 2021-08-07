const showMenu = document.getElementById("show-menu");
const closeMenu = document.getElementById("close-menu");

const menu = document.getElementById("mobile-menu");

function toggle() {
    menu.classList.toggle("shown");
    showMenu.classList.toggle("hidden");
    closeMenu.classList.toggle("hidden");
}

showMenu.addEventListener("click", toggle);
closeMenu.addEventListener("click", toggle);
