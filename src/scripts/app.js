import '../styles/app.scss';

let timeIn, timeOut;
const eyeElement = document.querySelector( '.eye' );

eyeElement.addEventListener( 'mouseenter', closeEye );
eyeElement.addEventListener( 'mouseleave', openEye );

openEye();

// ---------------------------------------------------------------------------- //

function openEye() {
	eyeElement.classList.remove( 'eye-closed' );
	startBlinking();
}

function closeEye() {
	stopBlinking();
	eyeElement.classList.add( 'eye-closed' );
}

function startBlinking( duration = 250, delay = random( 5000, 10000 ) ) {
	timeIn = setTimeout( () => {
		closeEye();
		timeOut = setTimeout( openEye, duration );
	}, delay );
}

function stopBlinking() {
	clearInterval( timeIn, timeOut );
}

function random( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
