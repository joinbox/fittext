/**
* Angular directive (wrapper) for the jQuery plugin squeezeText
*/

( function() {

	angular
	.module( 'jb.squeeze-text', [] )
	.directive( 'squeezeText', [ function() {

		var link = function( scope, el, attrs ) {

			// Get options from attributes
			var squeezeWidth			= attrs.squeezeWidth 	? $parent.$scope.$eval( attrs.squeezeWidth ) 	: true
				, squeezeHeight			= attrs.squeezeHeight 	? $parent.$scope.$eval( attrs.squeezeHeight ) 	: false;

			el.squeezeText( { squeezeWidth: squeezeWidth, squeezeHeight: squeezeHeight } );

		};

		return {
			link: link
		};

	} ] );

}() );