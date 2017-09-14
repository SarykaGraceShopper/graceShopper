
import User from '../../server/db/user'
import app from '../../server';

import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
import supertest from 'supertest-as-promised';

describe('▒▒▒ Backend tests ▒▒▒', () => {

    describe('HTTP Server', () => {

        let agent;
        beforeEach('Set up agent for testing', () => {
            agent = supertest(app);
        });

        describe('api routes', () => {

            let fire, ice;
            beforeEach('Seed users', () => {
                const users = [
                    {name: 'fire', destructiveness: 5},
                    {name: 'ice', destructiveness: -5}
                ];
                return User.bulkCreate(users, {returning: true})
                    // .then(createdUsers => {
                    //     fire = createdUsers[0].id;
                    //     ice = createdUsers[1].id;
                    // });
            });

            describe('users', () => {

                it('serves up all users on request to GET /', () => {
                    return agent
                        .get('/users')
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(2);
                            expect(res.body).to.contain.a.thing.with('id', 1);
                            expect(res.body).to.contain.a.thing.with('id', 2);
                        });
                });

            });

        });

    });

});
