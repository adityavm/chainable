/**
 * Simple
 * ===
 * This chain has no memory except its current chain. Every call to
 * `chain` starts a new chain. A reference can be saved to the last
 * link to continue the chain if needed.
 */

const chaino = require("../");

const keys = {
  red: (str, chain) => `${chain.join(",")}${chain.length ? ",": ""}red(${str})`,
  blue: (str, chain) => `${chain.join(",")}${chain.length ? "," : ""}blue(${str})`,
  yellow: (str, chain) => `${chain.join(",")}${chain.length ? "," : ""}yellow(${str})`,
  green: {},
}

const chain = chaino(keys);

let yellow = chain.yellow; // save reference to continue
console.log(yellow("abc"), yellow.blue("def")); // yellow(abc) yellow,blue(def)

console.log(chain.yellow.red.blue("abc")); // yellow,red,blue(abc)

console.log(chain.yellow.green.red("abc")); // yellow,green,red(abc)
