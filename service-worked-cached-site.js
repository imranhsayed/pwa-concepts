const cacheName = 'v2';

// Call install Event
self.addEventListener( 'install', ( event ) => {
    console.log( 'Service worker Installed' );
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
        .then( res => {
            // Make a copy of the response we get fom server.
            const resClone = res.clone();

            // Open cache.
            caches.open( cacheName )
            .then( cache => {
                console.log( 'Service Workers: Caching Files' );

                // Add response to cache
                cache.put( event.request, resClone )
            } )
            
            return res;
        } )
        .catch( err => caches.match( event.request ).then( res => res ) )
    )
} )