const mongodb = require('mongodb');
const config = require('./db');
const properties = require('./properties.json')
const client = mongodb.MongoClient;

let Subscription = null;

exports.size = function(callback) {
	// client.dbsize(function(error, result) {
	// 	if (error) {
	// 		callback(500);
	// 		throw error;
	// 	}
	// 	else
	// 		callback(result);
	// });
}

exports.set = function(subInfo, callback) {
	Subscription.create(subInfo, function(err, results) {
		if(err) {
			console.log(err)
			callback(500, 'Error saving data.')
			throw err
		} else {
			console.log('results set:',results)
			callback(200, results.id)
		}
	});
}

exports.get = async function(serviceName, callback) {
	Subscription.findOne({name: serviceName}, function(err, sub) {
		if (err) console.log('error get:',err) // TODO
		// console.log('Found a subscription for',sub.name);
		callback(sub);
	})
}

exports.getAllSubs = async function(callback) {
	Subscription.find({}, function(err, subs) {
		if (err) console.log('error get:',err) // TODO
		// console.log('Found a subscription for',sub.name);
		callback(subs);
	})
}

exports.init = function() {
	client.connect(config.DB, function(err, db) {
		if(err) {
			console.log('database is not connected')
		}
		else {
			console.log('connected!!')
		}
	});

	const mongoose = require('mongoose');
	mongoose.connect('mongodb://mongo/test');
	var historySchema = new mongoose.Schema({
		status: Number,
		text: String,
		details: Object
	});
	var History = mongoose.model('History', historySchema);

	var subscriptionSchema = new mongoose.Schema({
		id: Number,
		name: String,
		contact: String,
		url: String,
		cadence: Number,
		history: [historySchema],
		latest: historySchema
	});

	subscriptionSchema.methods.announce = function() {
		console.log('A new sub has been created for',this.name);
	}

	Subscription = mongoose.model('Subscription', subscriptionSchema);

	properties.services.map(service => {
		const subInfo = {
			name: service.name,
			url: service.url,
			contact: service.contact,
			cadence: service.cadence
		}
	
		exports.set(subInfo, (result) => res.send(result)) 
	});
}