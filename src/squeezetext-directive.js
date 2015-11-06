/**
* squeezetext directive for angular. Use by 
* - importing jb.squeezeText
* - adding squeeze-text attribute to an existing DOM element 
*
* When adding content to DOM with a certain delay using angular,
* it's much easier to use a directive than firing and catching some
* weird events.
*/
( function() {

	'use strict';

	angular
	.module( 'jb.squeezeText', [] )
	.directive( 'squeezeText', [ function() {

		return {
			link: function( scope, element ) {

				if( !window.squeezeText ) {
					console.error( 'SqueezeTextDirective: squeezeText plugin is not available. Maybe you forgot to load it?' );
					return;
				}

				window.squeezeText( element[ 0 ] );

			}
		};

	} ] );

} )();