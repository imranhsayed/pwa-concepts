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

// Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
if ( 'serviceWorker' in navigator ) {

	/**
	 * Register Service Worker
	 * 'sw.js' is our service worker file
	 */
	navigator.serviceWorker.register( '/sw.js' )
		.then( ( res ) => {
			console.warn( `Sevice Worker Registered ${res.scope}` );
		} )
		.catch( err => console.warn( 'SW registration failed' + err ) )

} else {
	console.warn( 'Service Workers not supported' );
}
