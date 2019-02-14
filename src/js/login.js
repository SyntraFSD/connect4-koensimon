const loginSwitch = document.querySelector('.login-switch');
const registerSwitch = document.querySelector('.register-switch');
const loginForm = document.querySelector('.wrapper');
const registerForm = document.querySelector('.wrapper-registration');
const loginAlert = document.querySelector('.error');

function switchForm(fromForm, toForm) {
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

function showLoginRequest(responseText, success) {
  if (success) {
    loginAlert.classList.add('success');
  } else {
    loginAlert.classList.remove('success');
  }
  loginAlert.classList.remove('hide');
  loginAlert.textContent = responseText;
}

function hideLoginAlert() {
  loginAlert.classList.add('hide');
}

function getFormData(Form) {
  const inputFields = Form.querySelectorAll('input');
  const formData = {};
  inputFields.forEach((inputField) => {
    formData[inputField.name] = inputField.value;
  });
  return formData;
}

function handleLoginRequest(event) {
  const request = event.target;
  if (request.readyState === 4) {
    const response = JSON.parse(request.responseText);
    if (request.status >= 200 && request.status < 300) {
      showLoginRequest('joepie je bent ingelogd', true);
      if (response.access_token) {
        window.localStorage.setItem('token', response.access_token);
        setTimeout(function () {
          
        })
        window.location = 'closed.html';
      }
    } else if (request.status === 401) {
      showLoginRequest(response.error, false);
    }
  }
}

function handleRegisterRequest(event) {
  const request = event.target;
  if (request.readyState === 4) {
    if (request.status >= 200 && request.status < 300) {
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

function register(event) {
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
loginForm.addEventListener('input', hideLoginAlert);

window.history.pushState({}, 'test2', 'closed.html');
