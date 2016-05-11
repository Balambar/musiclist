var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);



describe('Data API', function() {
	it('should list ALL data objects on /db GET', function(done) { // <- done is a function passed by chai that we call when we've made sure everything works
		chai.request('http://127.0.0.1:3000').get('/db').end(function(err, res) {

			// response should be of type json
			res.should.be.json;

			// the response should be a javascript object
			res.body.should.be.an('array');

			// we run done when all the tests have finished
			done();
		});
	});

	it('should list a SINGLE object on /<id> GET', function(done) {
		chai.request('http://127.0.0.1:3000').get('/0').end(function(err, res) {
			
			// make sure it's json
			res.should.be.json;

			 res.body.should.be.an('object');
			
			// on the object body we have title and text, both should be strings
			res.body.title.should.be.a('string');
			res.body.text.should.be.a('string');

			// if we're here the test passed, call done
			done();
		});
	});


	// this test is slightly more complex. we will post some data and then retrieve it from the server to make sure it actually inserted something
	it('should add a SINGLE object on /db POST', function(done) {
		// randomise to make sure it's not old data we're reading!
		var title = 'test' + Math.random();
		var text = 'test' + Math.random();

		chai.request('http://127.0.0.1:3000')
		.post('/insert')
		.set("Content-Type", "application/x-www-form-urlencoded")

		.send({ title: title, text: text })


		.end(function(err, res) { 

			// make a new request to check if data was inserted correctly. use insertId to get
				chai.request('http://127.0.0.1:3000').get('/db').end(function(err, res) {
				//res.should.redirectTo('http://127.0.0.1:3000');
				res.should.be.json;
				res.body.should.be.an('array');

				// now we're done! we can access done as we're still inside the outer scope
				done();
			});

		});
	});

	it('should update a SINGLE object on /db/<id> PUT', function(done) {
		var title = 'update' + Math.random();
		var text = 'update' + Math.random();

		chai.request('http://127.0.0.1:3000').put('/' + 0 )
		.set("Content-Type", "application/x-www-form-urlencoded")
		.send({ title: title, text: text })
		.end(function(err, res) {
			
			res.should.be.json;
			
			res.body.status.should.be.a('string');
			res.body.status.should.equal('OK');

			done();
		});
	});

	it('should delete a SINGLE object on /db/<id> DELETE', function(done) {
		chai.request('http://127.0.0.1:3000').delete('/' + 0).end(function(err, res) {
			
			res.should.be.json;
		//	res.body.should.be.an('array');
			res.body.status.should.be.a('string');
			res.body.status.should.equal('OK');

			done();
		});
	});
});