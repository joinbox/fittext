/**
* Use as you please.
*
* Will even work with -webkit-transitions on font
*/

( function( $, window, document, undefined ) {

	function squeezeText( $el ) {

		// Get paddings as they need to be removed from $el.width() to get it's effective width
		var paddings = parseFloat( $el.css('padding-left') ) + parseFloat( $el.css( 'padding-right' ) )

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
		var factor = ( $el.width() - paddings ) / $el.get( 0 ).scrollWidth;

		// Re-enable word breaks 
		$el
			.css( 'white-space', originalWhiteSpace )
			.css( getVendorPrefix() + "hyphens", originalHyphens );

		// Get current font size
		var currentFontSize = $el.data( 'originalFontSize' );

		// Update font size
		$el.css( 'font-size', factor * currentFontSize );
	
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



	$.fn.squeezeText = function() {

		// Use empty object as first argument or we will be changing $.srcset
		//options = $.extend( {}, $.srcset, opts || {} );
	
		$( this ).each( function() {
	
			// Store original font size; will be used when resizing window – always start with the 
			// original size before reducing it or text will get tinier every time
			$( this ).data( 'originalFontSize', parseFloat( $( this ).css( 'font-size' ) ) );

			squeezeText( $( this ) );
	
		} );





		// Update src on resize?
		$( window ).resize( function() {


			//setTimeout( function() {
				$( this ).each( function() {

					var cssTransitionCommand = getVendorPrefix() + "transition";

					// Remove transition & hide font
					var trans = $( this ).css( cssTransitionCommand );
					$( this ).css( cssTransitionCommand, "none" );

					var visibility = $( this ).css( 'visibility' );
					$( this ).css( 'visibility', 'hidden' );

					// squeeze text
					squeezeText( $( this ) );

					// Re-add transitions and visibility
					$( this ).css( cssTransitionCommand, trans );
					$( this ).css( 'visibility', visibility );


				} );
			//}.bind( this ), 150 );

		}.bind( this ) );

		return $( this );

	}


} )( window.jQuery || window.Zepto || window.$, window, document );

