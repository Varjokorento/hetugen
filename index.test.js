const Hetugen = require('./index.js');
const chai = require('chai')
const expect = chai.expect;

describe('FinnishSSN', () => {
    describe('#validate', () => {
      it('Should fail with empty string', () => {
        expect(Hetugen.validate('')).to.equal(false)
        }
      )
      it('Should fail with unvalid string', () => {
        expect(Hetugen.validate('testifail')).to.equal(false)
      })
      
      it('Should pass with a valid ssn', () => {
            const validSSN = '110393-2707'
            expect(Hetugen.validate(validSSN)).to.equal(true)
      })

      it('Should pass with a generated SSN', () => {
          const genSSN = Hetugen.generateSingleActual();
          expect(Hetugen.validate(genSSN)).to.equal(true)
      })
    }
    )

    describe('#generate', () => {
        it('Should be of length 11', () => {
            const generatedString = Hetugen.generate();
            expect(generatedString).to.length(11)
            }
        )
        it('Temporary should start with 9', () => {
            const generatedString = Hetugen.generate();
            let splitted = generatedString.split(/[-A]+/)
            expect(splitted[1][0]).to.equal("9")
            }
        )
    })

    describe('#generateSingleActual', () => {
        it('Should be of length 11', () => {
            const generatedString = Hetugen.generateSingleActual();
            expect(generatedString).to.length(11)
            }
        )
        it('Actual should not start with 9', () => {
            const generatedString = Hetugen.generateSingleActual();
            let splitted = generatedString.split(/[-A]+/)
            expect(splitted[1][0]).not.to.equal("9")
            }
        )
        it('Actual should be valid', () => {
            const generatedString = Hetugen.generateSingleActual();
            expect(Hetugen.validate(generatedString)).to.equal(true)
        })

        it ('1000 Actuals should all be valid', () => {
            for (var i = 0; i < 1000; i++) {
                const generatedString = Hetugen.generateSingleActual();
                expect(Hetugen.validate(generatedString)).to.equal(true)
            }
        })
    })

    describe('#generateSingleTemporary', () => {
        it('Should be of length 11', () => {
            const generatedString = Hetugen.generateSingleTemporary();
            expect(generatedString).to.length(11)
            }
        )
        it('Temp should start with 9', () => {
            const generatedString = Hetugen.generateSingleTemporary();
            let splitted = generatedString.split(/[-A]+/)
            expect(splitted[1][0]).to.equal("9")
            }
        )
        it('Temp should be valid', () => {
            const generatedString = Hetugen.generateSingleTemporary();
            expect(Hetugen.validate(generatedString)).to.equal(true)
        })
        it ('1000 Temps should all be valid', () => {
            for (var i = 0; i < 1000; i++) {
                const generatedString = Hetugen.generateSingleTemporary();
                expect(Hetugen.validate(generatedString)).to.equal(true)
            }
        })
    })

    describe('#generateNAmountGeneratesN', () => {
        it('returned array should have a size of n', () => {
            const n = 5;
            const retVal = Hetugen.generateN(n, true);
            expect(retVal.length).to.equal(n);
        })
        it('returned array should have all valids', () => {
            const n = 5;
            const retVal = Hetugen.generateN(n, true);
            retVal.forEach(ssn => {
                expect(Hetugen.validate(ssn)).to.equal(true)
            })
        })
        it('returned array should have temporaries if isActual is false', () => {
            const n = 5;
            const isActual = false;
            const retVal = Hetugen.generateN(n, isActual);
            retVal.forEach(ssn => {
                let splitted = ssn.split(/[-A]+/)
                expect(splitted[1][0]).to.equal("9")
            })
        })
        it('returned array should have temporaries if isActual is true', () => {
            const n = 5;
            const isActual = true;
            const retVal = Hetugen.generateN(n, isActual);
            retVal.forEach(ssn => {
                let splitted = ssn.split(/[-A]+/)
                expect(splitted[1][0]).not.to.equal("9")
            })
        })
    })



}
)
