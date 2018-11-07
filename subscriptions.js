const config = require('./db');
const properties = require('./properties.json')
const mongoose = require('mongoose');

let SUBSCRIPTION = null;

exports.size = function(callback) {
	if(SUBSCRIPTION) {
		SUBSCRIPTION.size(result, function(err, results) {
			if(err) {
				console.error(err);
				callback(500);
			} else {
				callback(results);
			}
		});
	} else {
		console.log('Mongoose is not connected, giving dummy data.');
		callback(properties.services.size);
	}
}

exports.set = function(subInfo, callback) {
	if(SUBSCRIPTION) {
		SUBSCRIPTION.create(subInfo, function(err, results) {
			if(err) {
				console.log(err);
				callback(500, 'Error saving data.');
				throw err
			} else {
				console.log('results set:',results);
				callback(200, results.id);
			}
		});
	} else {
		console.log('Mongoose is not connected, giving dummy data.');
		properties.services.push(subInfo)
		callback(200);
	}
}

exports.get = async function(serviceName, callback) {
	if(SUBSCRIPTION) {
		SUBSCRIPTION.findOne({name: serviceName}, function(err, sub) {
			if (err) console.log('error get:',err) // TODO
			// console.log('Found a subscription for',sub.name);
			callback(sub);
		});
	} else {
		console.log('Mongoose is not connected, giving dummy data.');
		callback(properties.services.filter(prop => prop.name == serviceName))
	}
}

exports.getAllSubs = async function(callback) {
	if(SUBSCRIPTION) {
		SUBSCRIPTION.find({}, function(err, subs) {
			if (err) console.log('error get:',err) // TODO
			// console.log('Found a subscription for',sub.name);
			callback(subs);
		});
	} else {
		console.log('Mongoose is not connected, giving dummy data.');
		callback(properties);
	}
}

exports.init = function() {
	mongoose.connect(config.DB, function(err, db) {
		if(err) {
			console.log('------ Database is not connected:')
			// throw err
		}
		else {
			console.log('-------Mongodb is connected!!')

			var subscriptionSchema = new mongoose.Schema({
				id: Number,
				name: String,
				contact: String,
				url: String,
				cadence: Number
			});
		
			subscriptionSchema.methods.announce = function() {
				console.log('A new sub has been created for',this.name);
			}
		
			SUBSCRIPTION = mongoose.model('Subscription', subscriptionSchema);
		}
	}).then(() => {
		properties.services.map(service => {
			const subInfo = {
				name: service.name,
				url: service.url,
				contact: service.contact,
				cadence: service.cadence
			}
		
			exports.set(subInfo, (result) => console.log('Status of saving property',result)) 
		});
	});
}