TestCase("AjaxCreateTest", {

	"test should return XMLHttpRequest object": function () {
		var xhr = tddjs.ajax.create();

		assertNumber(xhr.readyState);
		assert(tddjs.isHostMethod(xhr, "open"));
		assert(tddjs.isHostMethod(xhr, "send"));
		assert(tddjs.isHostMethod(xhr, "setRequestHeader"));
	}

});

TestCase("GetRequestTest", {

	"test should define get method": function () {
		assertFunction(tddjs.ajax.get);
	}

  , "test should throw error without url": function () {
  		assertException(function () {
  			tddjs.ajax.get();
  		}, "TypeError");
    }

});