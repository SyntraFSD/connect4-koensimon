console.log('hallo');
var token = window.localStorage.getItem('token');
var request = new XMLHttpRequest();
request.addEventListener('readystatechange', function (event) {
  if (request.readystate === 4) {
    if (request.status >= 200 && request.status < 300) {
      console.log(JSON.parse(request.responseText));
    }
  }
});
request.open('GET', 'http://connect4.pienter.space/api/auth/me');
request.setRequestHeader('Authorization', 'Bearer ' + token);
request.send();
//# sourceMappingURL=closed.js.map