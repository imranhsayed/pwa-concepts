# PWA Concepts
> * A demo for PWA Concepts.

## Demo Serve Pages Offline using Service Workers :video_camera:

![](demo-service-workers.gif)

## Getting Started :rocket:

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites :page_facing_up:

Basic knowledge of HTML CSS and JavaScript.

## Service Workers

### What are Service Workers?
A service worker is an event-driven javascript file, that is run in your browser in the background, separate from your webpage.

* act as a caching agent 
* handle network requests,
* store content for offline usage, using caching and 
* handle push messaging even when your browser is closed.

## Steps to Create a Progressive Web App:

1. We register a Service Worker ( in main.js )
2. Create a Service Worker file called `sw.js` and perform the below operations inside that.
3. Define `cacheName` and paths for the files to be cached inside `sw.js`
4. We listen to `install` event and `cache all files` we defined above, when the service worker is installed.
5. We listen to `activate` event and `delete the old version` of the cache, if there is a new version of cache available
6. We listen to the `fetch` event, the request is made on PWA, we `fetch the content from the cache` if its available otherwise we make a network request.
7. Add the icons for PWA
8. Add a `manifest.json` file and add the required fields and values
9. Add relevant `meta tags`, link your manifest.json file and include your main.js file, in `index.html`
10. Once done perform a `lighthouse audit` your site for PWA , under performance tab in chrome developer tool.


#### Registration
![](service-workers.png)

### Installation
![](service-worker-installed.png)

### Cache Storage
![](cache-storage.png)

## Service worker lifecycle
A service worker goes through three steps in its lifecycle:

1. Registration
2. Installation
3. Activation

### 1. Registration of Service Worker
To install a service worker, you need to register it in your main JavaScript code. Registration tells the browser where your service worker is located, and to start installing it in the background. Let's look at an example:

```ruby
if( 'serviceWorker' in navigator ) {
    navigator.serviceWorker
        .register( './service-worker-cached.js' )
        .then( registeration => console.log('Registration successful, scope is:', registeration.scope) )
        .catch( err => console.log('Service worker registration failed, error:', err) );
}
```

### 2. Installation of Service Worker
A service worker installation triggers an install event in the installing service worker. 

```ruby
// Listen for install event, set callback
self.addEventListener('install', ( event ) => {
    // Perform some task
});
```

### 2. Activation of Service Worker

```ruby
self.addEventListener( 'activate', ( event ) => {
    console.log( 'Service worker Activated' )
} );
```

## What is a [manifest file](https://developers.google.com/web/fundamentals/web-app-manifest/) for Web App?

* The web app manifest is a simple JSON file that tells the browser about your web application and how it should behave when 'installed' on the user's mobile device or desktop.
* Having a manifest is required by Chrome to show the Add to Home Screen prompt.
* A typical manifest file includes information about the app name, icons it should use, the start_url it should start at when launched, and more.

## How does push notification work?

> You need to ensure that you change the cache version name in sw.js file , every time you want to send a notification otherwise your pwa will pick up the data from cache and won’t have the new changes
  Notifications are shown from the service worker not the web app. The service worker goes on its own thread, independent of the app. So this is what allows it to display notifications, even when the app is not action.
  This means when we send notification, the serviceWorker does not have to be active, but just registered. So as soon as the serviceWorker gets registered we can send the notification.

> * So only once the service worker is registered, call our custom function handlePushNotification()
  We can pass also options to the sendNotification. 
> * In handlePushNotification(), Check is notifications are support , request permission and call sendNotification() to send notification  

```ruby
if ( 'serviceWorker' in navigator ) {

	navigator.serviceWorker.register( '/sw.js' )
		.then( ( res ) => {
			console.warn( `Sevice Worker Registered ${res.scope}` );

			// Check if notifications are supported
			if ( 'Notification' in window ) {
				console.warn( 'Notifications are supported' );

				// Request permission from user to send notifications.
				Notification.requestPermission().then( ( status ) => {
					
					if ( 'granted' === status ) {
					
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
						// When service worker is ready to show a notification, show the notification in the promise method
						sendNotification( 'New Notification', options );
					}
				} )
			}
		} )
		.catch( err => console.warn( 'SW registration failed' + err ) )
}

// Send notification
const sendNotification = ( title ) => {
	// When service worker is ready to show a notification, show the notification in the promise method
	navigator.serviceWorker.ready.then( ( registration ) =>  registration.showNotification( title, options ) );

};
```

## Tracking users behaviour to notifcations
* You can listen to the event when user closes the notification
* Add navigation to the relevant content when user clicks anywhere on the notification bar accept the close button

```ruby
// sw.js
// Close Notification.
const closeNotification = ( msg, event ) => {
	console.warn( msg, event.notification.data );
	event.notification.close();
};

self.addEventListener( 'notificationclose', ( event ) => {
	console.warn( 'came' );
	closeNotification( 'Notification Closed', event );
} );

// Listen to when click event on Notification bar, find the client which is visible and navigate the user to the relevant place in your page
self.addEventListener( 'notificationclick', ( event ) => {
	// If the user has not clicked on close button
	if ( 'close' !== event.action ) {
		event.waitUntil(
			// Get all the clients associated with the service worker, of type window, including the uncontrolled ones.
			self.clients.matchAll( { type: 'window', includeUncontrolled: true } )
				.then( allClients => {

					console.warn( allClients );

					allClients.map( client => {
						/**
						 * Check if the client is visible,
						 * then navigate/move it to the location set in event.notification.data.loc
						 * Means screen will move to that html element with id you have specified in event.notification.data.loc
						 */
						if ( 'visible' === client.visibilityState ) {
							console.warn( 'Navigating' );
							client.navigate( event.notification.data.loc );
							return;
						}
					})
				} )
		)
	}

	closeNotification( 'Notification Clicked', event );
} );
```

## Installation :wrench:

1. Clone this repo by running `git clone git@github.com:imranhsayed/pwa-concepts.git`
2. `cd pwa-concepts`
3. Install `Live Server` plugin from VS Code

## Branches Information

1. [simple-progressive-web-app](https://github.com/imranhsayed/pwa-concepts/tree/simple-progressive-web-app) A Simple Progressive Web App
2. [pwa-with-custom-prompt](https://github.com/imranhsayed/pwa-concepts/tree/pwa-with-custom-prompt) A Simple Progressive Web App with custom Add To Home Screen Mobile Prompt.
3. [service-worker-app](https://github.com/imranhsayed/pwa-concepts/tree/service-worker-app) A simple Service worker app.

4. [pwa-app-http-server](https://github.com/imranhsayed/pwa-concepts/tree/pwa-app-http-server) A Progressive Web App 
5. [send-notification-user-nav](https://github.com/imranhsayed/pwa-concepts/tree/send-notification-user-nav) Example of sending Notification in a PWA app. And when the user clicks on the notification, we can navigate him the section of the page we want 

##### Command
* `npm run start` Starts your development server on [http://localhost:8081](http://localhost:8081)
* `Cmd + Shift + P > Type Clear Console history` Shortcut to clear cache data.
## Useful Link :point_right:

1. [Genrate Favicon](https://realfavicongenerator.net)

## Training Links :mortar_board:

1. [Service Workers Documentation](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker)
2. [Service Worker Strategy Cookbook](https://serviceworke.rs/)

## Contributing :busts_in_silhouette:

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning :bookmark_tabs:

I use [Git](https://github.com/) for versioning. 

## Author :bust_in_silhouette:

* **[Imran Sayed](https://codeytek.com)**

## License :page_with_curl:

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
