'use strict';

const CACHE_NAME = 'showdown-v0';
const urlsToCache = ['/'];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error(err))
  );
});

const BASE_URL = 'http://api.tvmaze.com/search/shows?q=';
self.addEventListener('fetch', evt => {
  if (evt.request.url.indexOf(BASE_URL) > -1) {
    evt.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => (
          fetch(evt.request)
            .then(res => {
              cache.put(evt.request.url, res.clone());
              return res;
            })
        ))
        .catch(err => console.error(err))
    );
  } else {
    evt.respondWith(
      caches.match(evt.request)
        .then(res => {
          if (res) {
            return res;
          }

          return fetch(evt.request);
        })
        .catch(err => console.error(err))
    );
  }
});
