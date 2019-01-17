const loginSwitch = document.querySelector('.login-switch');
const registerSwitch = document.querySelector('.register-switch');
const loginForm = document.querySelector('.wrapper');
const registerForm = document.querySelector('.wrapper-registration');

function switchForm(fromForm, toForm){
  fromForm.classList.add('hide');
  toForm.classList.remove('hide');
}

function showLoginForm(event) {
  event.preventDefault();
  switchForm(registerForm, loginForm);
}

function showRegisterForm(event) {
  event.preventDefault();
  switchForm(loginForm, registerForm);
}

function getFormData(form) {
  const inputFields = loginForm.querySelectorAll('input');
  const formData = {};
  inputFields.forEach(function (inputField) {
    postData[inputField.username] = inputField.value;
  });
  return formData;
}

function login(event){
  event.preventDefault();
  const formData = getFormData(loginForm);
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', function (event) {

  });
  request.open('POST', '');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(formData));

loginSwitch.addEventListener('click', showRegisterForm);
registerSwitch.addEventListener('click', showLoginForm);
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
});

