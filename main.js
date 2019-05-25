// Check if the SW is supported
if( 'serviceWorker' in navigator ) {

    // Register a Service Worker
    navigator.serviceWorker
        .register( './service-worker-cached.js' )
        .then( registeration => console.log('Registration successful, scope is:', registeration.scope) )
        .catch( err => console.log('Service worker registration failed, error:', err) );
}