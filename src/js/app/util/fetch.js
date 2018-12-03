const BASE_URL = 'http://api.tvmaze.com/';

// export const get = url => fetch(`${BASE_URL}${url}`).then(res => res.json());
export const get = url => {
  console.error('getting url ', url);
  return fetch(`${BASE_URL}${url}`).then(res => res.json());
};

export const search = (resource, searchTerm) => (
  get(`search/${resource}?q=${searchTerm}`)
);

export const getSingle = (resource, id) => (
  get(`${resource}/${id}`)
);

export const getCastCredits = id => (
  get(`people/${id}/castcredits?embed[]=character&embed[]=show`)
);

export const getShowWithCast = id => (
  get(`shows/${id}?embed=cast`)
);
