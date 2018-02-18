// Define properties. Each property is callable, but also has
// a circular prototype to initial keys
function Assign(keys) {
  // Initialise module
  function Module(){};
  Module.chain = [];

  // Build chain
  function chain(chain, key) {
    const self = this;

    // Allow link to be executable
    function execute(...args) {
      try {
        return keys[key].apply(self, [...args, chain]);
      } catch (e) {
        return key;
      }
    }

    // Otherwise make new chain the current chain and continue
    execute.chain = [...chain, key];
    return execute;
  }

  const init = {};
  for(const key of Object.keys(keys)) {
    init[key] = {
      get(){
        const self = this;
        function fn(){
          return chain.call(self, self.chain, key); // keep `this` to original chain
        }
        fn.__proto__ = init; // create circular properties to allow chaining
        return fn(); // build a link in the chain
      },
      configurable: true,
    };
  }

  Object.defineProperties(Module.__proto__, init); // assign first layer of properties to module
  return Module;
}

module.exports = Assign;
