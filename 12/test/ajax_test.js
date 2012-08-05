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

	  , "test should add onreadystatechange handler": function () {
	  		ajax.get("/url");

	  		assertFunction(this.xhr.onreadystatechange);
	    }

	  , "test should call send": function () {
	  		ajax.get("/url");

	  		assert(this.xhr.send.called);
	    }

	});

	TestCase("ReadyStateHandlerTest", {
		setUp: function () {
			this.ajaxCreate = ajax.create;
			this.xhr = Object.create(fakeXMLHttpRequest);
			ajax.create = stubFn(this.xhr);
		}

	  , tearDown: function () {
	  		ajax.create = this.ajaxCreate
	    }

	  , "test should call success handler for status 200": function () {
	  		this.xhr.readyState = 4;
	  		this.xhr.status = 200;
	  		var success = stubFn();

	  		ajax.get("/url", {
	  			success: success
	  		});
	  		this.xhr.onreadystatechange();

	  		assert(success.called);
	    }

	  , "test should not throw error without success handler": function () {
	  		this.xhr.readyState = 4;
	  		this.xhr.status = 200;
	  		ajax.get("/get");

	  		assertNoException(function () {
	  			this.xhr.onreadystatechange();
	  		}.bind(this));
	    }
	});

}());
