function post(path, body) {
  const uri = getBaseUri(path);
  return fetch(uri, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

function put(path, body) {
  const uri = getBaseUri(path);
  return fetch(uri, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

function del(path, body) {
  const uri = getBaseUri(path);
  return fetch(uri, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function get(path, params) {
  const uri = buildGetUri(path, params);
  return fetch(uri, {
    method: 'get',
    headers: {
      Accept: 'application/json',
    },
  });
}

function getBaseUri(path) {
  return `http://13.125.189.204:3000${path}`;
}

function buildGetUri(path, params) {
  let url = getBaseUri(path);
  let paramURL = `?`;
  Object.keys(params).forEach((key) => (paramURL += `${key}=${params[key]}`));
  return url + paramURL;
}

export { post, get, del, put };
