var swEnvironment = {};
importScripts('sw-toolbox.js');
var CACHE_PREFIX = 'brocsw-v';
var CACHE_VERSION = CACHE_PREFIX+'1569927450502';
toolbox.options.cache.name = CACHE_VERSION;
var urlsToPrefetch = [
    '/',
    "assets/fonts/bootstrap/glyphicons-halflings-regular.eot",
    "assets/fonts/bootstrap/glyphicons-halflings-regular.svg",
    "assets/fonts/bootstrap/glyphicons-halflings-regular.ttf",
    "assets/fonts/bootstrap/glyphicons-halflings-regular.woff",
    "assets/fonts/bootstrap/glyphicons-halflings-regular.woff2",
    "assets/fonts/fontawesome/fontawesome-webfont.eot",
    "assets/fonts/fontawesome/fontawesome-webfont.svg",
    "assets/fonts/fontawesome/fontawesome-webfont.ttf",
    "assets/fonts/fontawesome/fontawesome-webfont.woff",
    "assets/fonts/fontawesome/fontawesome-webfont.woff2",
    "assets/fonts/fontawesome/FontAwesome.otf",
    "assets/to-do-list-08d3056cd0bf5903f2a391951f8332d2.js",
    "assets/to-do-list-77fa081e7b137fbcf29db8512088b1cf.css",
    "assets/vendor-3144f72b39c365fc8156b8226019100b.css",
    "assets/vendor-a4b7144036910e1a801b488ddd1599ef.js",
    "crossdomain.xml",
    "index.html",
    "manifest.appcache"
];
urlsToPrefetch.forEach(function(url) {
  toolbox.router.any(url, toolbox.cacheFirst);
});
toolbox.precache(urlsToPrefetch);
toolbox.router.any("/index.html",toolbox.fastest);
toolbox.router.any("/assets/*",toolbox.fastest);
toolbox.router.any("",toolbox.fastest);
toolbox.router.any("index.html",toolbox.fastest);
toolbox.router.any("assets/*",toolbox.fastest);
toolbox.router.any("/api/*",toolbox.networkFirst);
self.addEventListener('install', function(event) {
  if (self.skipWaiting) { self.skipWaiting(); }
});

self.addEventListener('activate', function(event) {
  // Delete all caches handled by broccoli-serviceworker.
  logDebug('Deleting out of date caches, current cache version:', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return (cacheName.indexOf('$$$inactive$$$') === -1 && cacheName.indexOf(CACHE_PREFIX) === 0 && cacheName !== CACHE_VERSION);
        }).map(function(cacheName) {
          logDebug('Deleting out of date cache:', cacheName);
          return caches.delete(cacheName).then(function() {
            return _postDeleteCacheHook(cacheName);
          });
        })
      );
    }).then(function() {
      self.clients.claim();
    })
  );
});

function _postDeleteCacheHook(cacheName) {
  if (typeof brocswPostDeleteCacheHook === 'function') {
    return brocswPostDeleteCacheHook(cacheName);
  }
  else {
    // Hook is not implemented in the app's serviceworker, that's fine.
    return Promise.resolve();
  }
}

function logDebug() {
  if (toolbox.options.debug) {
    if (arguments.length > 1) {
      var consoleArgs = [];
      for (var i=1;i<arguments.length;i++) {
        consoleArgs.push(arguments[i]);
      }
      console.log(arguments[0], consoleArgs);
    } else {
      console.log(arguments[0]);
    }
  }
}
