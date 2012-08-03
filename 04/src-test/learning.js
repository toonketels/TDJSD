TestCase("ArrayTest", {
	"test array splice should modify array": function () {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.splice(2, 3);

		assertEquals([1, 2], arr);
	}

  , "test array splice should return removed items": function () {
  		var arr = [1, 2, 3, 4, 5];
		var result = arr.splice(2, 2);

		assertEquals([3, 4], result);
    }

  , "test Function.protypte.length should return number of params specified": function () {
  		function testFunction(one, two) {}

  		assertEquals(2, testFunction.length);
    }

  , "test object[label] should return the value of the object's property": function () {
  		var obj = {one: 'one value'};

  		assertEquals("one value", obj['one']);
    }

  , "test array[index] should return the value of the array at that index": function () {
  		var arr = [1, 2, 3, 5, 8, 13, 21, 34, 55];

  		assertEquals(8, arr[4]);
    }

  , "test function property should be the same for each invokation of that function": function () {

		function hello() {
			hello.count++;
		}

  		hello.count = 0;

  		hello();
  		hello();
  		hello();

  		assertEquals(3, hello.count);
    }
});