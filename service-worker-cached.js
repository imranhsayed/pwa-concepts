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

    event.waitUntill(
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
    console.log( 'Service worker Activated' )
} );