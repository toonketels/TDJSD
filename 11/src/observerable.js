tddjs.namespace("util");

(function () {

	function _observers(observable, event) {
		if(!observable.observers) {
			observable.observers = {};
		}

		if(!observable.observers[event]) {
			observable.observers[event] = [];
		}

		return observable.observers[event];
	}

	function observe(event, observer) {
		if(typeof observer !== 'function') {
			throw new TypeError("This is not a function.");
		}

		_observers(this, event).push(observer);
	}

	function hasObserver(event, observer) {
		var observers = _observers(this, event);

		return (observers.indexOf(observer) !== -1);
	}

	function notify(event) {
		var observers = _observers(this, event);

		var args = Array.prototype.slice.call(arguments, 1);

		for (var i = 0, l = observers.length; i < l; i++) {
			try {
				observers[i].apply(this, args);
			} catch (e) {}
		}
	}

	tddjs.namespace("util").observable = {
		observe: observe
	  , hasObserver: hasObserver
	  , notify: notify
	};

}());