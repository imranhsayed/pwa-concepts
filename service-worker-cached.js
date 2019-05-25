const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    'Style.css',
    'main.js'
];

// Call install Event
self.addEventListener( 'install', ( event ) => {
    console.log( 'Service worker Installed' );

    event.waitUntil(
        caches.open( cacheName )
                .then( cache => {
                    console.log( 'Service Workers: Caching Files' );
                    cache.addAll( cacheAssets )
                } )
                .then( () => self.skipWaiting() )
                
    )
});

// Call Activate Events
self.addEventListener( 'activate', ( event ) => {
    console.log( 'Service worker Activated' );

    // Remove Unwanted cache
    event.waitUntil( 
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map( cache => {
                    if ( cache !== cacheName ) {
                        console.log( 'Clearing old cache' );
                        return caches.delete( cache );
                    }
                } )
            )
        } )
     );
} );

// Call fetch event
self.addEventListener( 'fetch', event => {
    console.log( 'Service Worker: Fetching' );
    event.respondWith(
        fetch( event.request )
        .catch( () => caches.match( event.request ) )
    )
} )