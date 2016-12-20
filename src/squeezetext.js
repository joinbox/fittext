/**
* Use as you please. Squeezes text in width and height to fit it's parent element. 
* Does only work on text that's not longer than 1 line. 
*
* Will even work with -webkit-transitions on font
*/
( function() {


	/**
	* Returns all elements in body with [data-squeeze-text]
	*/
	function getSqueezeElements() {

		var elements = document.querySelectorAll( '[data-squeeze-text]' );
		//console.log( 'SqueezeText: Squeeze elements %o', elements );
		return elements;

	}



	/**
	* Returns the vendor prefix for transitions
	*/
	function getVendorPrefix() {

		if( window.webkitRequestAnimationFrame ) {
			return "webkit";
		}
		if( window.mozRequestAnimationFrame ) {
			return "moz";
		}
		if( window.oRequestAnimationFrame ) {
			return "o";
		}
		if( window.msRequestAnimaitonFrame ) {
			return "ms";
		}
		return "";
	}


	/**
	* Returns the correctly prefixed transition CSS property
	*/
	function getCssTransitionCommand() {
		return getVendorPrefix() + 'Transition';
	}



	/**
	* Squeezes text for a single element.
	*/
	function squeezeElement( element ) {

		//console.log( 'SqueezeText: Squeeze text in %o', element );

		// Store original font size
		if( !element.hasAttribute( 'data-squeeze-original-font-size' ) ) {
			element.setAttribute( 'data-squeeze-original-font-size', window.getComputedStyle( element ).fontSize );
		}

		// Store original values
		var originalWhiteSpace		= element.style.whiteSpace
			, originalHyphens 		= element.style[ getVendorPrefix() + 'Hyphens' ]
			, originalVisibility 	= window.getComputedStyle( element ).visibility
			, cssTransition 		= getCssTransitionCommand()
			, originalTransition 	= element.style[ cssTransition ];





		// Store original visibility, then hide element
		element.style.visibility = 'hidden';

		// Store original transition, then remove transitions
		element.style[ cssTransition ] = 'none';

		// Re-set font-size to original font size to measure width of $el
		// Set white-space to nowrap, as breaking word changes scrollWidth
		element.style.fontSize = element.getAttribute( 'data-squeeze-original-font-size' );
		element.style.whiteSpace = 'nowrap';
		element.style[ getVendorPrefix() + 'Hyphens' ] = 'none';




		// Get paddings as they need to be removed from element's width to get its effective width
		var horizontalPaddings	= parseFloat( element.style.paddingLeft || 0 ) + parseFloat( element.style.paddingRight || 0 )
			, verticalPaddings	= parseFloat( element.style.paddingTop || 0 )  + parseFloat( element.style.paddingBottom || 0 );



		// Calculate factor that font size needs to be reduced by
		// (Divide width available by width that text takes)
		var widthFactor			= 1
			, heightFactor		= 1;



		if( element.getAttribute( 'data-squeeze-width' ) !== 'false' ) {
			// 0.98: Make sure that text fits. It may not be the case if we strictly use the correct formula.
			widthFactor = ( element.offsetWidth - horizontalPaddings ) / element.scrollWidth * 0.98;
		}

		if( element.getAttribute( 'data-squeeze-height' ) !== 'false' ) {
			heightFactor = ( element.offsetHeight - verticalPaddings ) / element.scrollHeight * 0.98;
		}


		
		// Re-enable word breaks 
		element.style.whiteSpace = originalWhiteSpace;
		element.style[ getVendorPrefix() + 'Hyphens' ] = originalHyphens;



		// Update font size – but only if both factors are numbers.
		if( !isNaN( widthFactor ) && !isNaN( heightFactor ) ) {
	
			// Get current font size
			var originalFontSize = parseFloat( element.getAttribute( 'data-squeeze-original-font-size' ) );

			if( !isNaN( originalFontSize ) ) {
				var newFontSize = Math.floor( Math.min( heightFactor, widthFactor ) * parseFloat( originalFontSize ) );
				element.style.fontSize = newFontSize + 'px';

			}

	
		}



		// If we re-add transition instantly, font will still animate, even though we add the transition
		// after the font size has been set. 
		setTimeout( function() {
			element.style[ getCssTransitionCommand() ] = originalTransition;
		}, 0 );
		
		element.style.visibility = originalVisibility;

	}



	/**
	* Squeezes text for elements passed in elements or all
	* DOM elements with data-squeeze
	*/
	function squeezeElements( elements ) {

		elements = elements || getSqueezeElements();

		// Single HTML element passed
		if( elements instanceof HTMLElement ) {
			elements = [ elements ];
		}

		// There's no element to squeeze-text
		if( !elements.length ) {
			return;
		}


		// Add all elements to squeezeText.elements
		[].forEach.call( elements, function( element ) {

			// Make sure we store element only once (duplicates may happen if squeezetext is initialized
			// multiple times)
			// Every element only needs to be squeezed once when window is being resized.

			if( window.squeezeText.elements.indexOf( element ) === -1 ) {
				window.squeezeText.elements.push( element );
			}
	
		} );


		[].forEach.call( elements, function( element ) {
			squeezeElement( element );
		} );

	}







	// When resizing window, only adjust font size after window has not been resized for 200ms
	// to not hurt browser's performance too much.
	var windowResizeTimer;
	function startWindowResizeTimer() {

		if( windowResizeTimer ) {
			clearTimeout( windowResizeTimer );
		}
		windowResizeTimer = setTimeout( windowResizeHandler, 500 );

	}

	function windowResizeHandler() {
		window.squeezeText.elements.forEach( function( element ) {
			squeezeElement( element );
		} );
	}









	/**
	* Make API public
	*
	* If elements is passed, squeezes text for elements, else for all elements in DOM 
	* that have a data-squeeze-text attribute
	*
	* By default squeezes to fit height and width. Set data-squeeze-height="false" or 
	* data-squeeze-width="false" to prevent squeezing width or height
	*/
	window.squeezeText = function( elements ) {
		squeezeElements( elements );
	};

	/**
	* Store all squeezeText elements – needed to update all when window is being resized.
	*/
	window.squeezeText.elements = [];



	// Automatically call squeezeText when DOM's ready
	if( document.readyState === 'complete' || document.readyState === 'interactive' ) {
			window.squeezeText();
	}
	else {
		document.addEventListener( 'DOMContentLoaded', function() {
			window.squeezeText();
		} );
	}

	window.addEventListener( 'resize', function() {
		startWindowResizeTimer();
	} );


} )();