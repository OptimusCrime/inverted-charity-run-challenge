export const fetchStatusRequest = () => fetch('/api/status');

export const fetchAuthRequest = () => fetch('/api/auth', {
  credentials: 'same-origin'
});

export const fetchEntryRequest = () => fetch('/api/entry');

export const updateAuthRequest = password => fetch('/api/auth', {
  method: 'post',
  credentials: 'same-origin',
  body: JSON.stringify({
    pw: password
  })
});

export const addEntryRequest = (identifier, comment) => fetch('/api/entry', {
  method: 'put',
  credentials: 'same-origin',
  body: JSON.stringify({
    identifier: identifier,
    comment: comment
  })
});

