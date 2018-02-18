/**
 * Chain with history
 * ===
 * Since Chaino only provides a history of the current chain,
 * the module is free to implement its own logic about what
 * to do with the chain at every point where a property is called.
 */

const chaino = require("../");

let chained = { red: 0, blue: 0, yellow: 0 };
let called = { red: 0, blue: 0, yellow: 0 };

// Build an array of given range
// (half values are added as 0.5 at the beginning)
const range = limit => {
  let arr = [];
  if (parseInt(limit) !== parseFloat(limit)) {
    arr.push(0.5);
    limit -= 0.5;
  }
  for (let i=0; i<limit; i++) arr.push(i);
  return arr;
}

// Build frequency chart for given range
const frequency = limit => range(limit).map(val => val === 0.5 ? "▃" : "█").join("");

// Each property flushes the chained properties and saves
// it to the called list. Chained properties are partially
// applied (indicated with += 0.5), while calls are wholly applied
// (indicated with a += 1)
const keys = {
  red: function(chain) {
    this.resetChained();
    chain.forEach(key => chained[key] += 0.5);
    called.red++;
    return this;
  },
  blue: function(chain) {
    this.resetChained();
    chain.forEach(key => chained[key] += 0.5);
    called.blue++;
    return this;
  },
  yellow: function(chain) {
    this.resetChained();
    chain.forEach(key => chained[key] += 0.5);
    called.yellow++;
    return this;
  },
  resetCalled: function() {
    called = { red: 0, blue: 0, yellow: 0 };
    return this;
  },
  resetChained: function() {
    chained = { red: 0, blue: 0, yellow: 0 };
    return this;
  },
  output: function() {
    console.log(`yellow (${called.yellow + chained.yellow})`.padEnd(15), frequency(called.yellow + chained.yellow))
    console.log(`red (${called.red + chained.red})`.padEnd(15), frequency(called.red + chained.red));
    console.log(`blue (${called.blue + chained.blue})`.padEnd(15), frequency(called.blue + chained.blue));
    console.log();
    return this;
  }
}

// Execute
const chain = chaino(keys);

// new chain
chain.yellow().output(); // yellow 1 red 0 blue 0

// new chain, but adds to old values due to module logic
chain.yellow().yellow().red.blue().blue().blue().yellow.red().output(); // yellow 3.5 red 1.5 blue 3
chain.resetCalled(); // flush module

// new chain
chain.red.blue().output(); // yello 0 red 0.5 blue 1
