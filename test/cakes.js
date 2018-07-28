//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//let cakes = require('../app/models/cakes');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
	
/*
  * Test the /GET route
  */
  describe('/GET /cakes', () => {
      it('it should GET all the cakes', (done) => {
        chai.request(server)
            .get('/cakes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
              done();
            });
      });
  });

	
/*
  * Test the /GET/:id route
  */
  describe('/GET /cakes/:id', () => {
      it('it should GET one cakes cakes', (done) => {
        chai.request(server)
            .get('/cakes/:id')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
              done();
            });
      });
  });

	
/*
  * Test the /PUT route
  */
  describe('/PUT /cakes/init', () => {
      it('it should init the list', (done) => {
        chai.request(server)
            .put('/cakes')
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });
  });

	
/*
  * Test the /DELETE route
  */
  describe('/DELETE /cakes/:id', () => {
      it('it should GET one cakes', (done) => {
        chai.request(server)
            .delete('/cakes/:id')
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('object');
              done();
            });
      });
  });

	
/*
  * Test the /GET route
  */
  describe('/GET /cakes', () => {
      it('it should GET all the cakes', (done) => {
        chai.request(server)
            .get('/cakes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
              done();
            });
      });
  });