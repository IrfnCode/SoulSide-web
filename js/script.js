//Toggle Class Active Untuk Navbar Sidebar
const navbarNav = document.querySelector(".navbar-nav");
//ketika di Menu sidebar di klik
document.querySelector("#hamburger-menu").onclick = () => {
    navbarNav.classList.toggle("active");
}

document.addEventListener('click', function(e) {
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    
});
//Toggle Class Active Untuk Shopping Cart/Order
const ShoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
    ShoppingCart.classList.toggle("active");
    e.preventDefault();
}
document.addEventListener('click', function(e) {
    if(!sc.contains(e.target) && !ShoppingCart.contains(e.target)) {
        ShoppingCart.classList.remove('active');
    }
});
// Ketika Diklik diluar hamburger akan menutup menunya
const hamburger =  document.querySelector ('#hamburger-menu');
const sc = document.querySelector ('#shopping-cart-button');

//Modal Box
const ItemDetailModal = document.querySelector("#item-detail-modal");
const ItemDetailButtons = document.querySelectorAll(".item-detail-button");

ItemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
       ItemDetailModal.style.display = 'flex';
       e.preventDefault();
    }
    
})

// Klik tombol close
document.querySelector('.modal .close-icon').onclick = (e) => {
    ItemDetailModal.style.display = 'none';
    e.preventDefault();
}
//Klik diluar modal
window.onclick = (e) => {
    if (e.target == ItemDetailModal) {
        ItemDetailModal.style.display = "none";
    }
}