TestCase("ObserverableAddObserverTest", {

	"test should store function" : function () {
		var observerable = new tddjs.util.Observerable();
		var observers = [function () {}, function () {}];

		assertFalse(observerable.hasObserver(observers[0]));

		observerable.addObserver(observers[0]);
		observerable.addObserver(observers[1]);

		assertTrue(observerable.hasObserver(observers[0]));
		assertTrue(observerable.hasObserver(observers[1]));
	}

  , "test should call all observers": function () {
  		var observerable = new tddjs.util.Observerable();
  		var observer1 = function () { observer1.called = true; };
  		var observer2 = function () { observer2.called = true; };

  		observerable.addObserver(observer1);
  		observerable.addObserver(observer2);

  		observerable.notifyObservers();

  		assertTrue(observer1.called);
  		assertTrue(observer2.called);
    }

  , "test should pass through arguments": function () {
  		var observerable = new tddjs.util.Observerable();
  		var actual;

  		observerable.addObserver(function () {
  			actual = arguments;
  		});

  		observerable.notifyObservers("String", 1, 32);

  		assertEquals(["String", 1, 32], actual);
    }

});