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
          console.log("genSSN", genSSN)
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
    })
}
)
