const dropdown = document.querySelector('.Header-links--mobile-dropdown');
const hamburger = document.querySelector('.Header-links--mobile-hamburger');

function showdropdown() {
  dropdown.classList.toggle('inactive');
}

hamburger.addEventListener('click', showdropdown);
