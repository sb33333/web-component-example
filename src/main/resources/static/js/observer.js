const bufferSymbol = Symbol("buffer");
const isRunningSymbol = Symbol("isRunning");
const consumerSymbol = Symbol("consumer");
const onNextSymbol = Symbol("onNext");

let prop={};

Object.defineProperties(prop, {
  [bufferSymbol] : {
    value: [],
    enumerable: true,
  },
  [isRunningSymbol] : {
    value: false,
    enumerable: true,
    configurable: true,
    writable: true
  },
  [consumerSymbol] : {
    value: function(data) {
      // sample
      console.log(data);
    },
    enumerable: true,
    writable: true
  },
  [onNextSymbol] : {
    value: function(data) {
      this[bufferSymbol].push(data);
      if (this[isRunningSymbol]) return;
      this[isRunningSymbol] = true;
      var buffer = this[bufferSymbol];
      var consumer = this[consumerSymbol];
      var that = this;
      setTimeout(function() {
        while(buffer.length > 0) {
          var element = buffer.shift();
          consumer(element);
        }
        that[isRunningSymbol] = false;
      }, 0);
    },
    enumerable: true
  },
  "onNext" : {
    get: function() {
      return this[onNextSymbol];
    },
    enumerable: true
  },
  "buffer" : {
    get: function() {
      return new Array(...this[bufferSymbol]);
    },
    enumerable: true
  },
  "consumer": {
    get: function() {
      return this[consumerSymbol];
    },
    set: function(consumerFunction) {
      this[consumerSymbol] = consumerFunction;
    },
    enumerable: true,
    configurable: false,
  }.
});


let observerMixin : {};
Object.defineProperty(observerMixin, "mix", {
  value: function(target) {
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(prop));
  },
  writable: false,
  configurable: false,
  enumerable: true
});

export default observerMixin;