# Rollup issue with circular dependencies

## Problem description

There is a circle in the dependecy graph of this project

```
index.js -> web3 -> web3-eth
                        |
                        v
                  web3-eth-accounts
                        |
                        v
elliptic <- eth-lib/lib/account
  |
  v
brorand -> crypto-browserify 
  ^                  |
  |                  v
miller-rabin <- diffie-hellman
```

[`miller-rabin (on line 53785)`](./bundle.js#L53785), 

[`diffie-hellman (on line 54209)`](./bundle.js#54209),

[`crypto-browserify (on line 67175)`](./bundle.js#67175), 

[`brorand (on line 67276)`](./bundle.js#L67276) 

are all included in the final bundle but the ordering is somehow buggy and causes an error in runtime.

Actually, `brorand` requires `crypto-browserify` inside a function so the former doesn't need the latter to be defined before it in module scope. So the correct order should be 
1. brorand
2. miller-rabin
3. diffie-hellman
4. crypto-browserify

I understand that circular dependency is neither fully supported nor intented to fully support in rollup. While `brorand` requires `crypto-browserify` inside a function, the latter is collected as a static dependency of `brorand`. I'm seeing this as a bug, what do you think about it?


## Steps to reproduce

1. `yarn install`
2. `yarn serve`
3. visit `http://localhost:8080` and open the developer tool
