var token = window.localStorage.getItem('token');
var request = new XMLHttpRequest();
request.addEventListener('readystatechange', function (event) {
  if (event.readystate === 4) {
    console.log(event);
  }
});
request.open('GET', 'http://connect4.pienter.space/api/auth/me');
request.setRequestHeader('Authorization', 'Bearer ' + token);
request.send();
//# sourceMappingURL=closed.js.map