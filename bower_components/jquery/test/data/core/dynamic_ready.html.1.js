
	var timeoutId, $,
		timeoutFired = false;

	setTimeout(function () {
		// Load another jQuery copy using the first one.
		$j.getScript( "../../../dist/jquery.js", function () {
			$j( "#dont_return" ).attr( "src", "about:blank" );

			// document ready handled by the just-loaded jQuery copy.
			$(function () {
				clearTimeout( timeoutId );
				if ( !timeoutFired ) {
					window.parent.iframeCallback( true );
				}
			});
		});

		timeoutId = setTimeout(function () {
			timeoutFired = true;
			window.parent.iframeCallback( false );
		}, 3000);
	});
