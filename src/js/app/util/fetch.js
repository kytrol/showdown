const BASE_URL = 'http://api.tvmaze.com/';

export const get = url => fetch(url).then(res => res.json());

export const search = (resource, searchTerm) => (
  get(`${BASE_URL}search/${resource}?q=${searchTerm}`)
);

export const getSingle = (resource, id) => (
  get(`${BASE_URL}${resource}/${id}`)
);
