# PWA Concepts
> * A demo for PWA Concepts.

## Getting Started :rocket:

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites :page_facing_up:

Basic knowledge of HTML CSS and JavaScript.

## Service worker lifecycle
A service worker goes through three steps in its lifecycle:

1. Registration
2. Installation
3. Activation

### 1. Registration of Service Worker
To install a service worker, you need to register it in your main JavaScript code. Registration tells the browser where your service worker is located, and to start installing it in the background. Let's look at an example:

```ruby
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}
```

## Installation :wrench:

1. Clone this repo by running `git clone git@github.com:imranhsayed/pwa-concepts.git`
2. `cd pwa-concepts`
3. Install `Live Server` plugin from VS Code

## Use :point_right:

## Training Links :mortar_board:

1. [Service Workers Documentation](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker)

## Contributing :busts_in_silhouette:

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning :bookmark_tabs:

I use [Git](https://github.com/) for versioning. 

## Author :bust_in_silhouette:

* **[Imran Sayed](https://codeytek.com)**

## License :page_with_curl:

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details