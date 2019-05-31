// Cache version.
const cacheName = 'CSv1';

/**
 * Paths for the files to be cached.
 *
 * There will be only one download of file on each route.
 * Once its downloaded, the page when that route is requested will be served from the cache
 *
 * @type {string[]}
 */
const cachedFiles = [
	'/',
	'/index.html',
	'/manifest.json',
	'/js/main.js',
	'/css/main.css',
	'/css/normalize.min.css',
	'/img/cassidy.jpg',
	'/img/cramer.jpg',
	'/img/duffy.jpg',
	'/img/gabor.jpg'
];

/**
 * We listen to the install event, When you register a SW , it gets registered and installed.
 * And when it gets installed, we cache the pages content.
 *
 * 'self' keyword refers to the current service worker
 * self.skipWaiting() allows it to skip waiting for the old service worker
 */
self.addEventListener( 'install', ( event ) => {

	console.warn( 'Service Worker Installed' );

	/**
	 * Add the files to the cache
	 *
	 * event has a method called waitUntil, which takes a promise. In this case caches.open()
	 * The caches.open() takes the cache version as cacheName and returns the cache object in promise.
	 * This cache object has a method called addAll() which adds the files that you pass as param to the cache memory.
	 *
	 * Then we call self.skipWaiting() So that it does not wait for the previous version of the cache and goes the next one.
	 */
	event.waitUntil(
		caches.open( cacheName )
			.then( cache => {

				console.warn( 'Caching Files');
				return cache.addAll( cachedFiles );

			} )
			.then( () => self.skipWaiting() )
			.catch( err => console.warn( err ) )
	);
});
