// Wrap testcase in anonymous function
// to access ajax namespace via variable.
(function () {

	var ajax = tddjs.ajax;

	TestCase("AjaxCreateTest", {
	
		"test should return XMLHttpRequest object": function () {
			var xhr = ajax.create();
	
			assertNumber(xhr.readyState);
			assert(tddjs.isHostMethod(xhr, "open"));
			assert(tddjs.isHostMethod(xhr, "send"));
			assert(tddjs.isHostMethod(xhr, "setRequestHeader"));
		}
	
	});



	TestCase("GetRequestTest", {

		setUp: function () {
			// Save original implementation ajax.create...
			this.ajaxCreate = ajax.create;
			this.xhr = Object.create(fakeXMLHttpRequest);
			ajax.create = stubFn(this.xhr);
		}

	  , tearDown: function () {
	  		// Restore it when tests are done.
	  		ajax.create = this.ajaxCreate;
	    }
	
	  , "test should define get method": function () {
			assertFunction(ajax.get);
		}
	
	  , "test should throw error without url": function () {
	  		assertException(function () {
	  			ajax.get();
	  		}, "TypeError");
	    }

	  , "test should obtain an XMLHttpRequest object": function () {

	  		// Make the actual get request, this should call our
	  		// overwritted create implementation...
	  		ajax.get("/url");

	  		// Test it...
	  		assert(ajax.create.called);
	    }

	  , "test should open with method, url, async flag": function () {

	  		var url = "/url";
	  		ajax.get(url);

	  		assertEquals(["GET", url, true], this.xhr.open.args);
	    }

	});

}());
