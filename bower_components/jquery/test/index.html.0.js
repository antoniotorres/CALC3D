
		(function() {
			var src = "../dist/jquery.min.js";

			// Config parameter to use minified jQuery
			QUnit.config.urlConfig.push({
				id: "dev",
				label: "Load unminified",
				tooltip: "Load the development (unminified) jQuery file"
			});
			if ( QUnit.urlParams.dev ) {
				src = "../dist/jquery.js";
			}

			// Config parameter to force basic code paths
			QUnit.config.urlConfig.push({
				id: "basic",
				label: "Bypass optimizations",
				tooltip: "Force use of the most basic code by disabling native querySelectorAll; contains; compareDocumentPosition"
			});
			if ( QUnit.urlParams.basic ) {
				document.querySelectorAll = null;
				document.documentElement.contains = null;
				document.documentElement.compareDocumentPosition = null;
			}

			// Load jQuery
			document.write( "<script id='jquery-js' src='" + src + "'><\x2Fscript>" );
		})();
	