
		jQuery(function ready() {
			var node = $("#child"), name;

			jQuery.each([".zoo", "#zoo", "[data-foo=zoo]", "#nonexistant"], function(i, item) {
	setTimeout(function(){
					name = "filter '" + item + "'";
		jQuery("#results").append("<li>" + name + "<ul>" +
						"<li>new: " + benchmarkString("$('div').filter('" + item + "')", 100, name) + "</li>" +
						"<li>old: " + benchmarkString("old('div').filter('" + item + "')", 100, name) + "</li>" +
			"</ul></li>");
		jQuery("#results").append("<li>single " + name + "<ul>" +
						"<li>new: " + benchmarkString("$('#nonexistant').filter('" + item + "')", 1000, name) + "</li>" +
						"<li>old: " + benchmarkString("old('#nonexistant').filter('" + item + "')", 1000, name) + "</li>" +
			"</ul></li>");
	}, 100);
			});
		});
	