
		var cc_on = false,
			errors = [];
/*@cc_on
		cc_on = true;
@*/
		window.onerror = function( errorMessage, filePath, lineNumber ) {
			errors.push( errorMessage );
		};
	