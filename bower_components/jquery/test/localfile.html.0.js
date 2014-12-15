
		var logUL = jQuery( "#log" );
		function doLog( message, args ) {
			jQuery( "<li />").appendTo( logUL ).text( message + ': "' + Array.prototype.join.call( args, '" - "' ) + '"' );
		}
		jQuery.ajax( "./data/badjson.js" , {
			context: jQuery( "#success" ),
			dataType: "text"
		}).success(function( data, _, xhr ) {
			doLog( "Success (" + xhr.status + ")" , arguments );
			this.addClass( data ? "success" : "error" ).text( "OK" );
		}).error(function( xhr ) {
			doLog( "Success (" + xhr.status + ")" , arguments );
			this.addClass( "error" ).text( "FAIL" );
		});
		jQuery.ajax( "./data/doesnotexist.ext" , {
			context: jQuery( "#error" ),
			dataType: "text"
		}).error(function( xhr ) {
			doLog( "Error (" + xhr.status + ")" , arguments );
			this.addClass( "success" ).text( "OK" );
		}).success(function( data, _, xhr ) {
			doLog( "Error (" + xhr.status + ")" , arguments );
			this.addClass( "error" ).text( "FAIL" );
		});
	