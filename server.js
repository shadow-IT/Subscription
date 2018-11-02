var express = require('express');
var bodyParser = require('body-parser')
let properties = require('./properties.json')
let { set, size, get, getAllSubs } = require('./subscriptions.js')
var app = express();
var bodyParser = require('body-parser')
const PORT = 3003

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

// TODO REMOVEME this will duplicate entries if the service is started up more than once.
properties.services.map(service => {
	const subInfo = {
		name: service.name,
		url: service.url,
		contact: service.contact,
		cadence: service.cadence
	}

	set(subInfo, (result) => res.send(result)) 
});


app.get('/', function(req, res){
	res.send('Hello Subscription!\n' + properties);
});

app.get('/health' , function(req, res) {
	res.sendStatus(200)
})

app.get('/api', function(req, res) {
	size((result) => res.send(result))
})

app.get('/api/subscribers', async function(req, res) {
	console.log('Providing ALL of the subscriptions.')
	// TODO 
	// res.json({result :[{
	// 	subscriptionName: 'testService1',
	// 	cadence: 1500,
	// }]})
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

console.log('Listening on port:',PORT)
app.listen(PORT);
