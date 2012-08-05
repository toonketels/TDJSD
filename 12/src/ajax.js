tddjs.namespace("ajax");

tddjs.namespace("ajax").create;


// Will be executed at load time.
// Does initial setup: checks for ajax support browser
(function () {
	var xhr;
	var ajax = tddjs.namespace("ajax");

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
			ajax.create = options[i];
			break;
		} catch (e) {}
	}
} ());