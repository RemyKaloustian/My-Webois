const mongoose = require("mongoose"),
    config = require('../config/main'),
    Accident = require('../models/accident.model');

//Require the dev-dependencies
const chai = require('chai'),
    chaiHttp = require('chai-http'),
    index = require('../index'),
    should = chai.should();

chai.use(chaiHttp);

let server = null;

getApiPath = function () {
    return config.apiPath;
}

const antibesLoc = [
    7.125102,
    43.580418
];

const antibesAccident = new Accident({
    location: antibesLoc,
})

//Our parent block
describe('Accidents', () => {
    // Set vars for the beginning of test
    before((done) => {
        server = chai.request(index);
        done();
    });

    // Clear DB before each test
    beforeEach((done) => {
        Accident.remove({}).then(() => done());
    });

    // After all the tests, clear
    after((done) => {
        Accident.remove({}).then(() => done());
    });

    /*
     * Test the /GET accidents
     */
    describe('/GET accidents', () => {

        it('it should GET all the accidents', (done) => {

            server
                .get(getApiPath() + '/accidents')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });

        });

        it('it should GET an accident by given id', (done) => {

            antibesAccident.save((err, a) => {
                server
                    .get(getApiPath() + '/accidents/' + a.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('location');
                        res.body.should.have.property('deleted').be.false;
                        res.body.should.have.property('_id').eql(a.id);
                        done();
                    });
            });

        });

    });

    /*
     * Test the /POST accident
     */
    describe('/POST accident', () => {

        it('it should NOT POST an accident without location fields', (done) => {

            let a = {
                name: "Test accident",
                description: "Description test"
            }

            server
                .post(getApiPath() + '/accidents')
                .send(a)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').include('longitude');
                    done();
                });

        });

        it('it should NOT POST an accident with wrong coordinates', (done) => {

            const a = {
                longitude: -1,
                latitude: 1,
            }

            server
                .post(getApiPath() + '/accidents')
                .send(a)
                .end((err, res) => {
                    // console.log(res.body);

                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('error').eql('Google Maps error');
                    done();
                });

        });

        it('it should POST an accident in Antibes ', (done) => {

            const a = {
                longitude: antibesLoc[0],
                latitude: antibesLoc[1],
            }

            server
                .post(getApiPath() + '/accidents')
                .send(a)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('location');
                    res.body.should.have.property('address').include('06600 Antibes');
                    res.body.should.have.property('_id');
                    done();
                });

        });

    });



    //- -----------------

    /*
     * Test the /PUT/:id/remove
     */
    describe('/PUT/:id/remove accident', () => {

        it('it should INCREMENT askedRemove counter', (done) => {

            antibesAccident.save((err, accident) => {
                server
                    .put(getApiPath() + '/accidents/' + accident.id + '/remove')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Accident updated.');
                        done();
                    });
            });

        });

    });



    //- -----------------

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id accident', () => {

        it('it should DELETE/MARK AS OK an accident with given id', (done) => {

            antibesAccident.save((err, accident) => {
                server
                    .delete(getApiPath() + '/accidents/' + accident.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Accident deleted successfully.');
                        done();
                    });
            });

        });

    });

});
