const observerSymbol = Symbol("observer");

let prop={}
Object.defineProperties(prop, {
  "observer":{
    get:function() {
      return this[observerSymbol];
    }, 
    enumerable:true
  },
  [observerSymbol] :{
    value:[],
    enumerable:true,
    writable:true,
    configurable:true,
  },
  "subscribe":{
    value:function(subscriber) {
      if(!this.[observerSymbol].includes(subscriber)) {
        this[observerSymbol].push(subscriber);
        return true;
      }
      return false;
    }, 
    enumerable: true
  },
  "unsubscribe" : {
    value: function(subscriber) {
      var filtered = this[observerSymbol].filter(element=>{
        return element !== subscriber;
      });
      this[observerSymbol] = filtered;
    },
    enumerable: true
  }
});

let observerMixin = {};
Object.defineProperties(observableMixin, "mix". {
  value: function(target) {
    Object.defineProperties(target, Object.getOwnPropertyDescriptor(prop));
  },
  writable: false,
  configurable: false,
  enumerable: true
});

export default observableMixin;