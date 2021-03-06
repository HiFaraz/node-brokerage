var token = require('./token'); // this token is from a practice account on Questrade

var brokerage = require('../lib');
var broker = new brokerage('questrade', token);

broker.test().then(connected).catch(tokenFailure);

function tokenFailure(error) {
	console.error('FAIL', error);

	if (error == 'Access token is invalid') {
		var get = require('../lib/request')({
			pathPrefix: 'https://practicelogin.questrade.com/oauth2/'
		}).get;

		get('token?grant_type=refresh_token&refresh_token=' + token.refresh_token).then(function (response) {
			token = response.entity;
			console.log('TOKEN', JSON.stringify(token))
			require('fs').writeFile('./spec/token.json', JSON.stringify(token), function (error) {
				if (error) console.error('ERROR', 'New token not saved, be sure to copy it manually', error)
				else console.log('SAVED NEW TOKEN')
			});
			broker = new brokerage('questrade', token);
			broker.test().then(connected).catch(genericFailure);
		}).catch(genericFailure);
	}
}

function connected() {
	console.log('PASS Connection to broker API established');
	broker.time().then(function (datetime) {
		//		console.log('TIME', datetime);
	}).catch(genericFailure);
	broker.user().then(function (id) {
		console.log('USER', id);
	}).catch(genericFailure)
	broker.accounts().then(function (accounts) {
		console.log('ACCOUNTS', 'Found ' + accounts.length + ' accounts');
	}).catch(genericFailure);
	broker.findSymbols('microsoft').then(function (symbols) {
		console.log('SYMBOL SEARCH', 'Found ' + symbols.length + ' accounts');
	}).catch(genericFailure);
	//	broker.symbol(27426).then(function (symbol) {
	broker.symbols([27426, 2067121]).then(function (symbols) {
		console.log('GET SYMBOLS', 'Got symbol data for ' + symbols.map(function (symbol) {
			return symbol.symbol
		}).join(','));
	}).then().catch(genericFailure);
	//	broker.quotes(2067121).then(function (symbols) {
	broker.quotes([27426, 2067121]).then(function (symbols) {
		console.log('QUOTES', 'Got quotes for ' + symbols.map(function (symbol) {
			return symbol.symbol
		}).join(','));
	}).catch(genericFailure);
};

function genericFailure(error) {
	console.error('FAIL', error);
}