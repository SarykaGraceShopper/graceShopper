import db from './server/db'
const User = db.model('user')
const Dragon = db.model('dragon')

import chai from 'chai';
const expect = chai.expect;
import supertest from 'supertest-as-promised';

describe('route tests', () => {

  beforeEach('Synchronize and clear database', () => db.sync({force: true}))
  after('synchronize and clear db', () =>db.sync({force: true})

  describe('db models', function() {

    describe('User Model', () => {


      it('has the expected schema definition', () => {
        expect(User.attributes.email).to.be.an('object');
      });

      describe('validations' ()=> {

        it('requires email', () => {
          const user = User.build();
          return user.validate()
            .then(() => {throw new Error('Promise should have been rejected');})
            .catch(err => {
              expect(err).to.exist;
              expect(err).to.be.an('error');
              expect(err.errors).to.contain.a.thing.with.properties({
                path: 'email',
                type: 'notNull Violation'
              });
            });
        });
      });

    });

    describe('Dragon Model' () => {

      it('has expected badness definition', () => {
        expect(Dragon.attributes.badness).to.be.an('object');
      });


      it('has expected color definition', () => {
        expect(Dragon.attributes.color).to.be.an('object');
      });

    });

    describe('validations' ()=> {

      it('requires a name' () => {
        const Dragon = Dragon.build();
        return Dragon.validate()
          .then(() => {throw new Error('Promise should have been rejected');})
          .catch(err => {
            expect(err).to.exist;
            expect(err).to.be.an('error');
            expect(err.errors).to.containt.a.thing.with.properties({
              path: 'name',
              type: 'notNull Violation'
            })
          })
      })

    })

  }


}
