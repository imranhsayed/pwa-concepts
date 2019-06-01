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
3. Define the cacheName and paths for the files to be cached inside `sw.js`
4. We listen to install event and cache all files we defined above, when the service worker is installed.
5. We listen to activate event and delete the old version of the cache, if there is a new version of cache available
6. We listen to the fetch event, the request is made on PWA, we fetch the content from the cache if its available otherwise we make a network request.
7. Add the icons for PWA
8. Add a manifest.json file and add the required fields and values
9. Add relevant meta tags, link your manifest.json file and include your main.js file, in `index.html`
10. Once done perform a lighthouse audit your site for PWA , under performance tab in chrome developer tool.


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

## Installation :wrench:

1. Clone this repo by running `git clone git@github.com:imranhsayed/pwa-concepts.git`
2. `cd pwa-concepts`
3. Install `Live Server` plugin from VS Code

## Branches Information

1. [simple-progressive-web-app](https://github.com/imranhsayed/pwa-concepts/tree/simple-progressive-web-app) A Simple Progressive Web App
2. [pwa-with-custom-prompt](https://github.com/imranhsayed/pwa-concepts/tree/pwa-with-custom-prompt) A Simple Progressive Web App with custom Add To Home Screen Mobile Prompt.
3. [service-worker-app](https://github.com/imranhsayed/pwa-concepts/tree/service-worker-app) A simple Service worker app.

4. [pwa-app-http-server](https://github.com/imranhsayed/pwa-concepts/tree/pwa-app-http-server) A Progressive Web App 

##### Command
* `npm run start` Starts your development server on [http://localhost:8081](http://localhost:8081)

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
