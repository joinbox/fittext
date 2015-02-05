/**
* Use as you please. Squeezes text in width and height to fit it's parent element. 
* Does only work on text that's not longer than 1 line. 
*
* Will even work with -webkit-transitions on font
*/

( function( $, window, document, undefined ) {

	var options;

	function squeezeText( $el ) {

		//
		// Remove transition & hide text
		//

		// Store original transition
		var trans = $el.css( getCssTransitionCommand() );

		// Set transition to 'none'
		$el.css( getCssTransitionCommand(), 'none' );

		// Store original visibility
		var visibility = $el.css( 'visibility' );

		// Set to hidden
		//$el.css( 'visibility', 'hidden' );




		// Get paddings as they need to be removed from $el.width() to get it's effective width
		var horizontalPaddings	= parseFloat( $el.css('padding-left') ) + parseFloat( $el.css( 'padding-right' ) )
			, verticalPaddings	= parseFloat( $el.css('padding-top') ) + parseFloat( $el.css( 'padding-bottom' ) );

		var originalWhiteSpace 	= $el.css( 'white-space' )
			, originalHyphens 	= $el.css( getVendorPrefix() + "hyphens" );

		// Re-set font-size to original font size to measure width of $el
		// Set white-space to nowrap, as breaking word changes scrollWidth
		$el
			.css( 'font-size', $el.data( 'originalFontSize' ) )
			.css( 'white-space', 'nowrap' )
			.css( getVendorPrefix() + "hyphens", "none" );



		// Calculate factor that font size needs to be reduced by
		// (Divide width available by width that text takes)
		//console.error( '%o : %o', $el.eq(0), $el.get( 0 ).scrollWidth );

		var widthFactor = heightFactor = 1;

		if( options.squeezeWidth ) {
			widthFactor = ( $el.width() - horizontalPaddings ) / $el.get( 0 ).scrollWidth;
		}

		if( options.squeezeHeight ) {
			heightFactor = ( $el.height() - verticalPaddings ) / $el.get( 0 ).scrollHeight;
		}

		//console.error( '%o-%o', widthFactor, heightFactor );
		//console.error( $el.get( 0 ).scrollWidth - horizontalPaddings );

		// Re-enable word breaks 
		$el
			.css( 'white-space', originalWhiteSpace )
			.css( getVendorPrefix() + "hyphens", originalHyphens );

		// Get current font size
		var currentFontSize = $el.data( 'originalFontSize' );

		// Update font size
		$el.css( 'font-size', Math.floor( Math.min( heightFactor, widthFactor ) * currentFontSize ) );


		//
		// Re-add transitions and visibility
		//

		// If we re-add transition instantly, font will still animate, even though we add the transition
		// after the font size has been set. 
		setTimeout( function() {
			$el.css( getCssTransitionCommand(), trans );
		}, 2 );
		$el.css( 'visibility', visibility );

	
	}
	



	/**
	* Returns the css vendor prefix (needed to disable css transitions on window's resize)
	*/
	function getVendorPrefix() {

		if( window.webkitRequestAnimationFrame ) {
			return "-webkit-";
		}
		if( window.mozRequestAnimationFrame ) {
			return "-moz-";
		}
		if( window.oRequestAnimationFrame ) {
			return "-o-";
		}
		if( window.msRequestAnimaitonFrame ) {
			return "-ms";
		}
		return "";
	}


	/**
	* Returns css-command for transition (e.g. "-webkit-transition")
	*/
	function getCssTransitionCommand() {
		return getVendorPrefix() + 'transition';
	}




	$.fn.squeezeText = function( opts ) {

		// Use empty object as first argument or we will be changing $.squeezetext
		options = $.extend( { squeezeWidth: true, squeezeHeight: false }, $.squeezetext, opts || {} );

		$( this ).each( function() {
	
			// Store original font size; will be used when resizing window – always start with the 
			// original size before reducing it or text will get tinier every time
			$( this ).data( 'originalFontSize', parseFloat( $( this ).css( 'font-size' ) ) );

			squeezeText( $( this ) );
	
		} );





		// Update src on resize?
		$( window ).resize( function() {

			$( this ).each( function() {

				//
				// Remove transition & hide
				//


				// Squeeze text
				squeezeText( $( this ) );



			} );

		}.bind( this ) );

		return $( this );

	}


} )( window.jQuery || window.Zepto || window.$, window, document );

