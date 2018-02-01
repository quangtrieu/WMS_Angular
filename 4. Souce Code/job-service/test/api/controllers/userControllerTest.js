// //During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// //Require the dev-dependencies
// var Sequelize = require('sequelize');
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../../../app');
// let should = chai.should();

// chai.use(chaiHttp);

// //Our parent block
// describe('Users', () => {
//     beforeEach((done) => {
//         //Before each test we empty the database

//     });

//     /*
//      * Test the /GET/:id route
//      */
//     describe('/GET/:id user', () => {
//         it('it should GET a user by the given id', (done) => {
//             let user = new Users({ id: 1 });
//             chai.request(server)
//                 .get('/api/getById/1')
//                 .send(user)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('id').eql(user.id);
//                     done();
//                 });
//         });
//     });
// });
