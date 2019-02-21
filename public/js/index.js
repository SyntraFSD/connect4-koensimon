var dropdown = document.querySelector('.Header-links--mobile-dropdown');
var hamburger = document.querySelector('.Header-links--mobile-hamburger');

function showdropdown() {
  dropdown.classList.toggle('inactive');
}

hamburger.addEventListener('click', showdropdown);
loginForm.addEventListener(submit, function (event) {
  event.preventDefault();
  console.log(event);
});

function getFormData(form) {}
//# sourceMappingURL=index.js.map