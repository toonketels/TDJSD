tddjs.namespace("ajax");

// Will be executed at load time.
// Does initial setup: checks for ajax support browser
// Use anonymous function's scope for attaching functions
// to ajax namespace.
(function () {

	tddjs.namespace("ajax");

	var xhr;
	var ajax = tddjs.namespace("ajax");

	ajax.create;

	var options = [
		function () {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}

	  , function () {
	  		return new XMLHttpRequest();
	    }
	];

	for (var i = 0, l = options.length; i < l; i++) {
		try {
			xhr = options[i]();

			if (typeof xhr.readyState == "number" &&
				tddjs.isHostMethod(xhr, "open") &&
				tddjs.isHostMethod(xhr, "send") &&
				tddjs.isHostMethod(xhr, "setRequestHeader")) {
	
				ajax.create = options[i];	
				break;
			}
		} catch (e) {}
	}

	if (!ajax.create) {
		return;
	}

	function requestComplete(transport, options) {
		if (transport.status == 200) {
			if (typeof options.success == "function") {
				options.success(transport);
			}
		}
	}


	function get(url, options) {
		if (typeof url != "string") {
			throw new TypeError("URL should be string");
		}

		var options = options || {};

		var transport = ajax.create();
		transport.open("GET", url, true);
		
		transport.onreadystatechange = function() {
			if (transport.readyState == 4) {
				requestComplete(transport, options);
			}
		};

		transport.send();
	}

	ajax.get = get;
} ());