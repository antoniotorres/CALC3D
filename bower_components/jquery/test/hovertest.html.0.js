

$(function(){

	var x,
		countIns = function() {
			var d = $(this).data();
			$("span.ins", this).text(++d.ins);
		},
		countOuts = function() {
			var d = $(this).data();
			$("span.outs", this).text(++d.outs);
		};

	// Tests can be activated separately or in combination to check for interference

	$("#hoverbox button").click(function(){
		$("#hoverbox")
			.data({ ins: 0, outs: 0 })
			.hover( countIns, countOuts );
		$(this).remove();
	});
	$("#delegateenterbox button").click(function(){
		$("html")
			.find("#delegateenterbox").data({ ins: 0, outs: 0 }).end()
			.delegate("#delegateenterbox", "mouseenter", countIns )
			.delegate("#delegateenterbox", "mouseleave", countOuts );
		$(this).remove();
	});
	$("#liveenterbox button").click(function(){
		$("#liveenterbox")
			.data({ ins: 0, outs: 0 })
			.live("mouseenter", countIns )
			.live("mouseleave", countOuts );
		$(this).remove();
	});

	$("#overbox button").click(function(){
		$("#overbox")
			.data({ ins: 0, outs: 0 })
			.bind("mouseover", countIns )
			.bind("mouseout", countOuts );
		$(this).remove();
	});
	$("#liveoverbox button").click(function(){
		$("#liveoverbox")
			.data({ ins: 0, outs: 0 })
			.live("mouseover", countIns )
			.live("mouseout", countOuts );
		$(this).remove();
	});
	$("#delegateoverbox button").click(function(){
		$(document)
			.find("#delegateoverbox").data({ ins: 0, outs: 0 }).end()
			.delegate("#delegateoverbox", "mouseover", countIns )
			.delegate("#delegateoverbox", "mouseout", countOuts );
		$(this).remove();
	});
});

