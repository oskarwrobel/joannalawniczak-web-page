import '../styles/app.scss';

let timeIn, timeOut;
const eye = document.querySelector( '.eye' );

eye.addEventListener( 'mouseenter', () => {
	eye.classList.add( 'blink' );
	clearInterval( timeIn, timeOut );
} );

eye.addEventListener( 'mouseleave', () => {
	eye.classList.remove( 'blink' );
	blink();
} );

blink();

function blink( duration = 250, delay = random( 5000, 10000 ) ) {
	timeIn = setTimeout( () => {
		eye.classList.add( 'blink' );
		timeOut = setTimeout( () => {
			eye.classList.remove( 'blink' );
			blink();
		}, duration );
	}, delay );
}

function random( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
