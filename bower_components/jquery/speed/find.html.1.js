
		jQuery(function ready() {
			var node = $("#child"), name;

			jQuery.each([".zoo", "#zoo", "[data-foo=zoo]", "#nonexistant"], function(i, item) {
	setTimeout(function(){
					name = "find '" + item + "'";
		jQuery("#results").append("<li>rooted " + name + "<ul>" +
						"<li>new: " + benchmarkString("$('body').find('" + item + "')", 250, name) + "</li>" +
						"<li>old: " + benchmarkString("old('body').find('" + item + "')", 250, name) + "</li>" +
			"</ul></li>");
	}, 100);
			});
		});
	