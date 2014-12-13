
		// html5shiv, enabling HTML5 elements to be used with jQuery
		( "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup " +
			"mark meter nav output progress section summary time video"
		).replace(/\w+/g, function(n) {
			document.createElement(n);
		});
	