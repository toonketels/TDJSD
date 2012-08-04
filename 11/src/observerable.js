tddjs.namespace("util");

(function () {

	function observe(observer) {
		if(!this.observers) {
			this.observers = [];
		}
		if(typeof observer !== 'function') {
			throw new TypeError("This is not a function.");
		}
		this.observers.push(observer);
	}

	function hasObserver(observer) {
		if(!this.observers) {
			return false;
		}
		return (this.observers.indexOf(observer) !== -1);
	}

	function notify() {
		if(!this.observers) {
			console.log('called');
			return;
		}
		for (var i = 0, l = this.observers.length; i < l; i++) {
			try {
				this.observers[i].apply(this, arguments);
			} catch (e) {}
		}
	}

	tddjs.namespace("util").observable = {
		observe: observe
	  , hasObserver: hasObserver
	  , notify: notify
	};

}());