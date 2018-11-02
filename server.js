var express = require('express');
var bodyParser = require('body-parser')
let { set, size, get, getAllSubs, init } = require('./subscriptions.js')
var app = express();
app.port = 3003

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

init();


app.get('/', function(req, res){
	res.send('Hello Subscription!');
});

app.get('/health' , function(req, res) {
	// TODO check if DB is available?
	res.sendStatus(200)
})

app.get('/api', function(req, res) {
	size((result) => res.send(result))
})

app.get('/api/subscribers', async function(req, res) {
	console.log('Providing ALL of the subscriptions.')
	getAllSubs( (result) => res.send(result) );
})

app.get('/api/:serviceName', async function(req, res) {
	const serviceName = req.params.serviceName
	// console.log('Got a request for subscriber information. Subscriber',serviceName)
	get(serviceName, (result) => res.send(result))
})

app.patch('/api/properties', function(req, res) {
	properties = require('./properties.json')
	console.log(properties)
	res.send(properties)
})

app.post('/api/:serviceName', function(req, res) {
	const subInfo = {
		name: req.params.serviceName,
		url: req.body.url,
		contact: req.body.contact,
		cadence: req.body.cadence
	}

	console.log(subInfo)
	set(subInfo, (result) => res.send(result)) 
})

app.listen(app.port, () => console.log(`Cadence listening on port ${app.port}!`))

module.exports = app; // For testing.