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
    }
    )
}
)
