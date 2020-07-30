# Finnish Social Security Number (SSN) Generator

This is a small Javascript library for generating Finnish SSN. The logic is based on Tuomas Salste's quality article: https://www.tuomas.salste.net/doc/hetu/tunnus.html.

This generator will not generate SSNs from before 1900 nor from the future. 
(min = 1900, max = current year)

Please note that SSNs with a ending of 002-899 can be actual SSNs. 

## How to use


```
const Hetugen = require('hetugen');

// generates a single temporary ssn
console.log(Hetugen.generate())

// generates a single temporary ssn
console.log(Hetugen.generateSingleTemporary());

// generates a single actual ssn
console.log(Hetugen.generateSingleActual());

// returns array of n ssns, 
const isActual = true
console.log(Hetugen.generateN(5, isActual))



```


## Releases
  * 0.3.0 
      - fixed validation
      - fixed a bug generation
      - optimized and cleaned code
  * 0.2.1 Minor release
      - fixed dependencies
  * 0.2.0 Second release
      - Fixes a bug where the checksum is incorrectly generated
      - Improves validation to actually check for a correct checksum
  * 0.1.0 First working release 
  * Unordered sub-list. 
