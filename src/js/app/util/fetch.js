const BASE_URL = 'http://api.tvmaze.com/';

export const get = (resource, searchTerm) => (
  fetch(`${BASE_URL}search/${resource}?q=${searchTerm}`)
    .then(res => res.json())
);
