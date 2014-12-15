
		jQuery(function ready() {
			var node = $("#child"), name;

			jQuery.each([".zoo", "#zoo", "[data-foo=zoo]", "#nonexistant"], function(i, item) {
	setTimeout(function(){
					name = "closest '" + item + "'";

		jQuery("#results").append("<li>" + name + "<ul>" +
						"<li>new: " + benchmarkString("$('#child').closest('" + item + "')", 2500, name) + "</li>" +
						"<li>old: " + benchmarkString("old('#child').closest('" + item + "')", 2500, name) + "</li>"
			+ "</ul></li>");
	}, 100);
			});
		});
	