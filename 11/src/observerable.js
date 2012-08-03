tddjs.namespace("util");

(function () {
	function Observerable() {
		this.observers = [];
	}

	function addObserver(observer) {
		this.observers.push(observer);
	}

	function hasObserver(observer) {
		return (this.observers.indexOf(observer) !== -1);
	}

	function notifyObservers() {
		for (var i = 0, l = this.observers.length; i < l; i++) {
			this.observers[i].apply(this, arguments);
		}
	}

	Observerable.prototype.addObserver = addObserver;
	Observerable.prototype.hasObserver = hasObserver;
	Observerable.prototype.notifyObservers = notifyObservers;

	tddjs.util.Observerable = Observerable;
}());