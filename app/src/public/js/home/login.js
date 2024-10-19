'use strict';

const id = document.querySelector('#id'),
      psword = document.querySelector('#psword'),
      loginBtn = document.querySelector('button');

loginBtn.addEventListener('click', () => {
  const req = {
    id : id.value,
    psword : psword.value,
  }

  console.log();

  fetch('/login', {
    method : "POST",
    headers : {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(req),
  })
});