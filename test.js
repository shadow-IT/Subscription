const server = require('./server.js')
const request = require('request')
const expect = require('chai').expect

describe('server responses', function() {
	it('GET on / should return Hello subscription!', function(done) {
		request.get('http://localhost:'+server.port, function(err, res, body) {
			expect(res.statusCode).to.equal(200);
			expect(res.body).to.equal('Hello Subscription!');
			done()
		})
	})
	it('GET on /health should return status 200', function(done) {
		// TODO add variables directly in the strings.
		request.get('http://localhost:'+server.port+'/health', function(err, res, body) {
			expect(res.statusCode).to.equal(200);
			done()
		})
	})
})