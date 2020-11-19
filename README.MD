[![NPM](https://nodei.co/npm/hetugen.png)](https://npmjs.org/package/hetugen)

# Finnish Social Security Number (SSN) Generator

This is a small Javascript library for generating valid Finnish SSN. The logic is based on Tuomas Salste's quality article: https://www.tuomas.salste.net/doc/hetu/tunnus.html. 

This generator will not generate SSNs from before 1900 nor from the future. 
(min = 1900, max = current year)

Finnish SSN has the following format: ddmmyy-XXXT
Where ddmmyy is the birthdate and XXX is a rolling number used to differentiate people born on the same day and T is a checksum to ensure that the ssn has been validly generated. (Also the last X in the XXX differentiates between male and females but that is not something that this generator takes into account.)

NB: The Finnish SSN system has two types of SSNs. Actual SSNs which can be given to people and are registered in Väestörekisteri (Finnish people registry) and temporary SSNs which are used for testing purposes and in the past were given to babies before the actual SSN was generated. Actual SSNs have the identification (the XXX in the ddmmyy-XXXT) part be in the format of 000-899 and temporary ones have the format of 900-999. As actual SSNs can be someone's actual SSN, it is not recommended to use these SSNs for any testing purposes. That's why the generator by default generates an temporary SSN. 


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
  * 1.0.1
      - dependencies updated
  * 1.0.0 
      - First stable release
  * 0.9.0 
      - Should generate valid ssns.
      - Should be able to validate ssns
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
