import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

function parseJSON(response) {
  return response.json();
}

function parseText(response) {
  return response.text();
}

function checkStatus(response) {
  console.log(response)
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const err = new Error(response.statusText);
  err.response = response;
  throw err;
}

export function request(url, options) {
  NProgress.start();

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      NProgress.done();
      return {data};
    })
    .catch((err) => {
      NProgress.done();
      return {err};
    });
}

export function requestText(url, options) {
  console.log(`请求: ${url}`)
  NProgress.start();
  return fetch(url, options)
    .then(checkStatus)
    .then(parseText)
    .then((data) => {
      NProgress.done();
      return {data}
    })
    .catch((err) => {
      NProgress.done();
      return {err}
    });
}
