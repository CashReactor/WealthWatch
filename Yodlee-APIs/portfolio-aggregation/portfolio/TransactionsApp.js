var path = require('path');
var  mainApp  =  require(path.resolve('MainApp.js'));
var  globalApp  =  require(path.resolve('Global.js'));
var  configApp  =  require(path.resolve('Config.js'));
var  request  =  require('request');
var readlineSync = require('readline-sync');
var async = require('async');
function TransactionsApp() {
	console.log('-------------Transactions APP------------');
	//Setting the input parameters for Transactions API Call
	globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.transactionsURL;
	globalApp.properties.options.method = globalApp.properties.get;
	globalApp.properties.options.headers.Authorization = 'userSession='+globalApp.properties.userSessionToken+', cobSession='+globalApp.properties.cobSessionToken;
	console.log('-----------------------------------------------------------');
	console.log('Container - Amount - BaseType - Category - TransactionDate');
	console.log('------------------------------------------------------------');
	//Invoking the Transactions API Call
	request(globalApp.properties.options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			if(body.length >2 ) {
				var gson = JSON.parse(body);
				for(var i = 0; i<gson.transaction.length; i++) {
					console.log(gson.transaction[i].CONTAINER + ' - ' +gson.transaction[i].amount.amount+'('+ gson.transaction[i].amount.currency+') - '+gson.transaction[i].baseType+' - '+gson.transaction[i].category+' - '+(gson.transaction[i].date != undefined ? gson.transaction[i].date : ' '));
				}
				console.log('----------------------------------------------------------------');
			} else {
				console.log('No transactions');
			}
			mainApp.MainApp();
		}
	})
}
exports.TransactionsApp = TransactionsApp