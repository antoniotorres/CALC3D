
		function report( event ) {
			var payload = {
				event: event.type
			};
			return parent.postMessage( JSON.stringify(payload), "*" );
		}

		jQuery( window ).on( "beforeunload", function( event ) {
			report( event );
		}).on( "load", function( event ) {
			setTimeout(function() {
				window.location.reload();
			}, 50);
		});
	