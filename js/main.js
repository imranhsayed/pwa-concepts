window.onhashchange = function(){
    //Header is fixed, need to slide down some to see sectionHead
    setTimeout('scrollBy(0,-110)',10);
};
var hidden = true;
function toggleNav(){
    if(hidden){
        document.getElementsByTagName('nav')[0].style.display = 'block';
    }else{
        document.getElementsByTagName('nav')[0].style.display = 'none';
    }
    hidden = !hidden;
}

const handlePushNotification = () => {
	// Check if notifications are supported
	if ( 'Notification' in window ) {
		console.warn( 'Notifications are supported' );

		/**
		 * Request permission from user to send notifications.
		 *
		 */
		Notification.requestPermission().then( ( result ) => {
			console.warn( 'Notification Status', result );
			if ( 'granted' === result ) {

				const options = {
					body: 'Check out the new GOW4',
					icon: 'android-chrome-192x192.png',
					data: {
						timeStamp: Date.now(),
						loc: 'index.html#info'
					},
					actions: [
						{ action: 'go', title: 'Go Now' }
					]
				};

				sendNotification( 'New Notification', options );
			}
		} )
	}
};

const sendNotification = ( title, options ) => {
	// When service worker is ready to show a notification, show the notification in the promise method
	navigator.serviceWorker.ready.then( ( registration ) =>  registration.showNotification( title, options ) );

};

// Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
if ( 'serviceWorker' in navigator ) {

	/**
	 * Register Service Worker
	 * 'sw.js' is our service worker file
	 */
	navigator.serviceWorker.register( '/sw.js' )
		.then( ( res ) => {
			console.warn( `Sevice Worker Registered ${res.scope}` );
			// Handle Push Notification, only once the service worker is registered
			handlePushNotification();
		} )
		.catch( err => console.warn( 'SW registration failed' + err ) )

} else {
	console.warn( 'Service Workers not supported' );
}

var installEvent;
window.addEventListener( 'beforeinstallprompt', ( event ) => {

	console.warn( 'Before Install Prompt' );

	// Store the beforeinstallprompt event pointer in installEvent for later use
	installEvent = event;

	// Prevent the Chrome 67 and older versions, to automatically show the default 'Add to Home Screen' prompt
	event.preventDefault();

	// Show the custom 'Add to Home Screen' prompt that we created in index.html.
	document.getElementById( 'addToHomeScreen' ).style.display = 'block';
} );

const hidePrompt = () => {
	document.getElementById( 'addToHomeScreen' ).style.display = 'none';
};

const installApp = () => {
	// Once user installs the app, the prompt is no longer needed so we hide it
	hidePrompt();

	// Use the beforeinstallprompt event pointer to call the prompt() and show our custom Add to Home Screen install prompt
	installEvent.prompt();

	// Wait on the prompt promise to resolve.
	installEvent.userChoice.then( ( result ) => {
		( 'accepted' === result.outcome ) ? console.warn( 'App installed' ) : console.warn( 'App not installed' );


	});
};

window.addEventListener( 'appinstalled', ( event ) => {
	console.warn( 'appsinatlled event called' );
} );
