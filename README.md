# Subscription :heavy_check_mark: ✔️

## Purpose

**To provide subscription information for all of the service endpoints. This includes the URL where the health checks occur, the regions where the endpoint needs to be checked, and the types of checks wanted to run the health check.**

## API
| method	| resource			| params						| result	|
| ---		| ---				| ---							| ---	|
| GET 		| /health 			| N/a 							| none or 200	|
| GET		| /api				| N/a							| TODO	|
| GET		| /api/:serviceName	| params.serviceName			| TODO	|
| GET		| /api/properties	| N/a							| TODO	|
| POST		| /api/:serviceName	| params.serviceName, body.url	| TODO	|


## Usage
As a user of this API 
- I would like to send and recieve information about the name and test url of the subscribers.
- I would like to send and recieve information about the details of how to test the subscriber, such as the test regions, what qualifies as a failure, etc...
- I would like to send and recieve infortmation about the correct way to communicate with the subscriber. The required information to successfully call the subscriber.s

## TODO
- Add MongoDB as the backend implementation.
