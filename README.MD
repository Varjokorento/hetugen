# Finnish Social Security Generator

This is a small Javascript library for generating Finnish SSN. The logic is based on Tuomas Salste's quality article: https://www.tuomas.salste.net/doc/hetu/tunnus.html.

Please note that SSNs with a ending of 002-899 can be actual SSNs. 

## How to use


```
const Hetugen = require('hetugen');

console.log(Hetugen.generateSingleTemporary());

console.log(Hetugen.generateSingleActual());

// returns array of n ssns, 
const isActual = true
console.log(Hetugen.generateN(5, isActual))

```



## Releases




