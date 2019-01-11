var dropdown = document.querySelector('.Header-links--mobile-dropdown');
var hamburger = document.querySelector('.Header-links--mobile-hamburger');

function showdropdown() {
  dropdown.classList.toggle('inactive');
}

hamburger.addEventListener('click', showdropdown);
//# sourceMappingURL=index.js.map