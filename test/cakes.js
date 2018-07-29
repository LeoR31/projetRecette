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
                res.should.be.json;
              done();
            });
      });
  });

	
it('it should get ONE cake.', function(done) {
      chai.request(server)
        .get('/cakes/'+1)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('desc');
          done();
        });
});
	
/*
  * Test the /PUT route
  */
  describe('/PUT /cakes/init', () => {
      it('it should init the list', (done) => {
        chai.request(server)
            .put('/cakes/init')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INIT');
              done();
            });
      });
  });

	
it('it should delete ONE cake.', function(done) {
  chai.request(server)
    .get('/cakes')
    .end(function(err, res){
      chai.request(server)
        .delete('/cakes/'+1)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('REMOVED');
          response.body.REMOVED.should.be.a('object');
          response.body.REMOVED.should.have.property('title');
          done();
      });
    });
});

describe('/POST /cakes/', () => {
  it('it should ADD one cake', (done) => {
  chai.request(server)
    .post('/cakes')
    .send({'title': 'test', 'desc': 'test','rating': 'test','image': 'test'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      res.body.SUCCESS.should.have.property('title');
      res.body.SUCCESS.should.have.property('desc');
      res.body.SUCCESS.title.should.equal('test');
      done();
    });
  });
});