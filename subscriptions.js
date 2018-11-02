const mongodb = require('mongodb');
const config = require('./db');
const client = mongodb.MongoClient;

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

var Subscription = mongoose.model('Subscription', subscriptionSchema);

/*
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"
*/


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
			throw err
		} else {
			console.log('results set:',results)
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
