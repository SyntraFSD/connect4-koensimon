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
    formData[inputField.name] = inputField.value;
  });
  return formData;
}

function handleLoginRequest(event){
  const request = event.target;
  if(request.readyState === 4){
    if(request.status >= 200 && request.status < 300){
      console.log('success');
      console.log(request);
    } else {
      console.log('error');
      console.log(request);
    }
  }
}

function handleRegisterRequest(event){
  const request = event.target;
  if(request.readyState === 4){
    if(request.status >= 200 && request.status < 300){
      console.log('success');
      console.log(request);
    } else {
      console.log('error');
      console.log(request);
    }
  }
}

function login(event) {
  event.preventDefault();
  const formData = getFormData(loginForm);
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', handleLoginRequest);
  request.open('POST', 'http://connect4.pienter.space/api/auth/login');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(formData));
}

function register(event){
  event.preventDefault();
  const formData = getFormData(registerForm);
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', handleRegisterRequest);
  request.open('POST', 'http://connect4.pienter.space/api/auth/register');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(formData));
}

loginSwitch.addEventListener('click', showRegisterForm);
registerSwitch.addEventListener('click', showLoginForm);
loginForm.addEventListener('submit', login);
registerForm.addEventListener('submit', register);
