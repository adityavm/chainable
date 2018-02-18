const chaino = require("./");

const keys = Object.create(null);

const add = chain => chain.length ? `${chain.join(",")},` : "";
keys.red = function(arg, chain) { return `${add(chain)}red(${arg})`; },
keys.blue = function(arg1, arg2, chain) { return `123,blue(${arg1},${arg2})`; };
keys.yellow = function(arg, chain) { return `${this.red(arg, chain)},${this.blue(arg, null, chain)},yellow(${arg})`; };

const chain = chaino(keys);

it("should have initial keys", () => {
  expect(chain).toHaveProperty("red");
  expect(chain).toHaveProperty("blue");
  expect(chain).toHaveProperty("yellow");
});

it("should have chained properties", () => {
  expect.assertions(60); // each loop calls 3 expectations

  let c = 0;

  let newChain = chain;
  while(c < 20) {
    Object.keys(keys).forEach(key => expect(newChain).toHaveProperty(key));

    // Randomly pick a key to chain to
    const randomKey = Math.floor(Math.random() * 3 + 0);
    newChain = newChain[Object.keys(keys)[randomKey]];

    c++;
  }
});

it("should output final result when ending chain", () => {
  expect(chain.red("abc")).toBe("red(abc)");
  expect(chain.blue.red("abc")).toBe("blue,red(abc)");

  expect(chain.blue("abc", "def")).toBe("123,blue(abc,def)");
  expect(chain.yellow.blue("mno", "pqr")).toBe("123,blue(mno,pqr)");

  expect(chain.yellow("abc")).toBe("red(abc),123,blue(abc,null),yellow(abc)");
  expect(chain.red.yellow("abc")).toBe("red,red(abc),123,blue(abc,null),yellow(abc)");
});
