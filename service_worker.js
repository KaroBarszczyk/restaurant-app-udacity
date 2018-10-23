let staticCacheName = 'staticApp';
let cachedURLS = [		'./',
				'./index.html', 
				'./restaurant.html',
				'./css/styles.css', 
				'./img/1.jpg',
				'./img/2.jpg',
				'./img/3.jpg',
				'./img/4.jpg', 
				'./img/5.jpg',
				'./img/6.jpg',
				'./img/7.jpg',
				'./img/8.jpg',
				'./img/9.jpg', 
				'./img/10.jpg',
				'./js/main.js',
				'./js/restaurant_info.js',
				'./js/dbhelper.js',
				'./data/restaurants.json'
				];


self.addEventListener('install', function(event) {
	event.waitUntil(
		caches
			.open(staticCacheName)
			.then(function(cache) {
				return cache.addAll(cachedURLS);
		})
	);
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', function(event) {
	console.log("Service worker is ready to handle fetches.");
	event.waitUntil(
		caches.keys()
					.then(function(cacheNames) {
						return Promise.all(
							cacheNames.map(function(cacheName) {
								if(cacheName !== staticCacheName) {
									console.log('Deleting out of date cache:', cacheName);
									return caches.delete(cacheName);
								}
							})
						)
					})
	)
});



self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches
			.match(event.request)
			.then (function(response) {
				if(response) {
					return response;
				} 
				return fetch(event.request);
			})
	)
});
