
			var script = document.getElementsByTagName( "script" )[ 0 ],
				div = document.createElement( "div" ),
				src = "http://" + window.parent.externalHost,
				success = true,
				error = "";

			script.parentNode.appendChild( div );
			div.innerHTML = "<iframe name=\"test\" src=\"" + src + "\">";

			jQuery(function() {
				try {
					jQuery( "<div>hello<div>world</div>!</div>" ).appendTo( "#qunit-fixture" );
				} catch( e ) {
					success = false;
					error = e;
				}

				window.parent.iframeCallback({
					status: success,
					description: "buildFragment sets the context without throwing an exception" +
						( error ? ": " + error : "" )
				});
			});
		