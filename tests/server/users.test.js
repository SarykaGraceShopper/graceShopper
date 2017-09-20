
import User from '../../server/db/user'
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

            //can't repeat email, must generate random string
            //credit: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            }

            console.log(makeid());

            let link, zelda;
            beforeEach('Seed users', () => {
                const linkemail = makeid();
                const zeldaemail = makeid();
                const users = [
                    { name: 'link', email: `${linkemail}@hyrule.com` },
                    { name: 'zelda', email: `${zeldaemail}@hyyrulez.com` }
                ];
                return User.bulkCreate(users, { returning: true })
                    .then(createdUsers => {
                        link = createdUsers[0].id;
                        zelda = createdUsers[1].id;
                    });
            });

            describe('users route', () => {

                it('serves up all users on request to GET /', () => {
                    return agent
                        .get('/api/users')
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('array');
                            expect(res.body.find((pwr) => pwr.id == link).name).to.be.equal('link');
                            expect(res.body.find((pwr) => pwr.id == zelda).name).to.be.equal('zelda');
                        });
                });

                it('serves up link user by id', () => {
                    return agent
                        .get(`/api/users/${link}`)
                        .expect(200)
                        .then(res => {
                            expect(res.body.id).to.be.equal(link);
                            expect(res.body.name).to.be.equal('link');
                        });
                });

                it('serves up zelda user by id', () => {
                    return agent
                        .get(`/api/users/${zelda}`)
                        .expect(200)
                        .then(res => {
                            expect(res.body.id).to.be.equal(zelda);
                            expect(res.body.name).to.be.equal('zelda');
                        });
                });

                it('posts new user', () => {
                    let dbCount = 0;
                    agent.get('/api/users')
                        .then(res => {
                            dbCount = res.body.length;
                        });
                    const ganonemail = makeid();
                    return agent
                        .post(`/api/users/`)
                        .send({ name: 'ganondorf', email: ganonemail + '@gerudont.com' })
                        .set('Accept', 'application/json')
                        .expect(201)
                        .then(res => {
                            expect(res.body.name).to.be.equal('ganondorf');
                            expect(res.body.email).to.be.equal(ganonemail + '@gerudont.com');
                            agent.get('/api/users')
                                .then(res => {
                                    expect(res.body.length).to.be.equal(dbCount + 1);
                                });

                        });
                });

                it('updates user by id', () => {
                    return agent
                        .put(`/api/users/${zelda}`)
                        .send({ name: 'milkshake' })
                        .set('Accept', 'application/json')
                        .expect(200)
                        .then(res => {
                            expect(res.body.id).to.be.equal(zelda);
                            expect(res.body.name).to.be.equal('milkshake');
                        });
                });

                // it('deletes user by id', () => {
                //     let dbCount = 0;
                //     agent.get('/api/users')
                //         .then(res => {
                //             dbCount = res.body.length;
                //         });
                //     return agent
                //         .delete(`/api/users/${zelda}`)
                //         .expect(200)
                //         .then(res => {
                //             expect(res.body.id).to.be.equal(zelda);
                //             expect(res.body.name).to.be.equal('zelda');
                //             agent.get('/api/users')
                //                 .then(res => {
                //                     expect(res.body.length).to.be.equal(dbCount - 1);
                //                 });
                //             agent.get(`/api/users/${zelda}`)
                //                 .expect(404)

                //         });
                // });

            });

        });

    });

});
