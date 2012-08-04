tddjs.namespace("util");

(function () {
	function Observerable() {

	}

	function addObserver(observer) {
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

	function notifyObservers() {
		if(!this.observers) {
			return;
		}
		for (var i = 0, l = this.observers.length; i < l; i++) {
			try {
				this.observers[i].apply(this, arguments);
			} catch (e) {}
		}
	}

	Observerable.prototype.addObserver = addObserver;
	Observerable.prototype.hasObserver = hasObserver;
	Observerable.prototype.notifyObservers = notifyObservers;

	tddjs.util.Observerable = Observerable;
}());