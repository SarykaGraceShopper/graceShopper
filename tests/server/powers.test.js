
import Power from '../../server/db/power'
import app from '../../server/index';

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
            beforeEach('Seed powers', () => {
                const powers = [
                    { name: 'fire', destructiveness: 5 },
                    { name: 'ice', destructiveness: -5 }
                ];
                return Power.bulkCreate(powers, { returning: true })
                    .then(createdPowers => {
                        fire = createdPowers[0].id;
                        ice = createdPowers[1].id;
                    });
            });

            describe('powers route', () => {

                it('serves up all powers on request to GET /', () => {
                    return agent
                        .get('/api/powers')
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('array');
                            // expect(res.body.length).to.be.equal(2); //need to empty db
                            expect(res.body.find((pwr) => pwr.id == fire).name).to.be.equal('fire');
                            expect(res.body.find((pwr) => pwr.id == ice).name).to.be.equal('ice');
                        });
                });

                it('serves up fire power by id', () => {
                    return agent
                        .get(`/api/powers/${fire}`)
                        .expect(200)
                        .then(res => {
                            expect(res.body.id).to.be.equal(fire);
                            expect(res.body.name).to.be.equal('fire');
                        });
                });

                it('serves up ice power by id', () => {
                    return agent
                        .get(`/api/powers/${ice}`)
                        .expect(200)
                        .then(res => {
                            expect(res.body.id).to.be.equal(ice);
                            expect(res.body.name).to.be.equal('ice');
                        });
                });

                it('posts new power', () => {
                    let dbCount = 0;
                    agent.get('/api/powers')
                        .then(res => {
                            dbCount = res.body.length;
                        });

                    return agent
                        .post(`/api/powers/`)
                        .send({ name: 'hyperbeam', destructiveness: 10 })
                        .set('Accept', 'application/json')
                        .expect(201)
                        .then(res => {
                            expect(res.body.name).to.be.equal('hyperbeam');
                            expect(res.body.destructiveness).to.be.equal(10);
                            agent.get('/api/powers')
                                .then(res => {
                                    expect(res.body.length).to.be.equal(dbCount + 1);
                                });

                        });
                });

                it('updates power by id', () => {
                    return agent
                        .put(`/api/powers/${ice}`)
                        .send({ name: 'milkshake', destructiveness: 0 })
                        .set('Accept', 'application/json')
                        .expect(200)
                        .then(res => {
                            expect(res.body.id).to.be.equal(ice);
                            expect(res.body.name).to.be.equal('milkshake');
                            expect(res.body.destructiveness).to.be.equal(0);
                        });
                });

                it('deletes power by id', () => {
                    let dbCount = 0;
                    agent.get('/api/powers')
                        .then(res => {
                            dbCount = res.body.length;
                        });
                    return agent
                        .delete(`/api/powers/${ice}`)
                        .expect(200)
                        .then(res => {
                            expect(res.body.id).to.be.equal(ice);
                            expect(res.body.name).to.be.equal('ice');
                            expect(res.body.destructiveness).to.be.equal(-5);
                            agent.get('/api/powers')
                                .then(res => {
                                    expect(res.body.length).to.be.equal(dbCount - 1);
                                });
                            agent.get(`/api/powers/${ice}`)
                            .expect(404)

                        });
                });

            });

        });

    });

});
