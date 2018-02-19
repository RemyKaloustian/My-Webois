const mongoose = require("mongoose"),
    config = require('../config/main.config'),
    Comment = require('../models/comment.model'),
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

let accident = null;

//Our parent block
describe('Comments', () => {
    // Set vars for the beginning of test
    before((done) => {
        server = chai.request(index);

        antibesAccident.save().then((a) => {
            accident = a;
            done();
        });
    });

    // Clear DB before each test
    beforeEach((done) => {
        Comment.remove({}).then(() => {
            Accident.update({}, {
                comments: []
            }).then(() => done());
        });
    });

    // After all the tests, clear
    after((done) => {
        Comment.remove({}, (err) => {
            Accident.remove({}).then(() => {
                done();
            });
        });
    });

    /*
     * Test the /POST comment
     */
    describe('/POST comment', () => {

        it('it should NOT POST a comment without comment message', (done) => {

            let c = {
                name: "Bob",
            }

            server
                .post(getApiPath() + '/accidents/' + accident._id + '/comments')
                .send(c)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Missing comment.');
                    done();
                });

        });

        it('it should POST a comment', (done) => {

            let c = {
                name: "Bob",
                comment: "Comment test"
            }

            server
                .post(getApiPath() + '/accidents/' + accident._id + '/comments')
                .send(c)
                .end((err, res) => {
                    // console.error(res.body['comments']);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('comments');
                    res.body.should.have.nested.include({
                        'comments[0].comment': 'Comment test'
                    });
                    done();
                });

        });

        it('it should POST two comments', (done) => {

            let c = {
                name: "Bob",
                comment: "Comment test"
            }

            server
                .post(getApiPath() + '/accidents/' + accident._id + '/comments')
                .send(c)
                .then(() => {
                    server.post(getApiPath() + '/accidents/' + accident._id + '/comments')
                        .send(c)
                        .end((err, res) => {
                            // console.error(res.body['comments']);
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('comments');
                            res.body.comments.length.should.be.eql(2);
                            done();
                        });
                });

        });

    });

});
