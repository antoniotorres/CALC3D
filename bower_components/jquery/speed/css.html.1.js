
	var num = 400;

	jQuery(function(){
		var p = old("p");
		var s = (new Date).getTime();

		for ( var n = 0; n < 5; n++ ) {
			for ( var i = 0; i < num; i++ ) {
				p.css("position");
				p.css("top");
				p.css("left");
				p.css("display");
			}
		}

		var oldNum = (new Date).getTime() - s;

		p = jQuery("p");
		s = (new Date).getTime();

		for ( var n = 0; n < 5; n++ ) {
			for ( var i = 0; i < num; i++ ) {
				p.css("position");
				p.css("top");
				p.css("left");
				p.css("display");
			}
		}

		var curNum = (new Date).getTime() - s;

		jQuery("#num").text( old.fn.jquery + ": " + oldNum + " " + jQuery.fn.jquery + ": " + curNum );
	});

	jQuery(function(){
		var p = old("p");
		var s = (new Date).getTime();

		for ( var n = 0; n < 5; n++ ) {
			for ( var i = 0; i < num; i++ ) {
				p.css("position", "relative");
				p.css("top", 15);
				p.css("left", 15);
				p.css("display", "block");
			}
		}

		var oldNum = (new Date).getTime() - s;

		p = jQuery("p");
		s = (new Date).getTime();

		for ( var n = 0; n < 5; n++ ) {
			for ( var i = 0; i < num; i++ ) {
				p.css("position", "relative");
				p.css("top", 15);
				p.css("left", 15);
				p.css("display", "block");
			}
		}

		var curNum = (new Date).getTime() - s;

		jQuery("#num2").text( old.fn.jquery + ": " + oldNum + " " + jQuery.fn.jquery + ": " + curNum );
	});
	