var path = require('path');
var  mainApp  =  require(path.resolve('MainApp.js'));
var  globalApp  =  require(path.resolve('Global.js'));
var  configApp  =  require(path.resolve('Config.js'));
var  request  =  require('request');
var readlineSync = require('readline-sync');
var async = require('async');
function StatementsApp(){
	console.log('------------Statements APP------------');
	//Setting the input parameters for Statements API Call
	globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.statementsURL;
	globalApp.properties.options.method = globalApp.properties.get;
	globalApp.properties.options.headers.Authorization = 'userSession='+globalApp.properties.userSessionToken+', cobSession='+globalApp.properties.cobSessionToken;
	console.log('----------------------------------------------');
	console.log('Statement Id, Statement Date');
	console.log('----------------------------------------------');
	//Invoking the Statements API
	request(globalApp.properties.options,  function  (error,  response,  body)  {
		if  (!error  &&  response.statusCode  ==  200)  {
			if(body.length >2 ) {
				var gson = JSON.parse(body);
				for(var i = 0; i<gson.statement.length; i++) {
					console.log(gson.statement[i].id + ', ' + (gson.statement[i].statementDate !== undefined ? gson.statement[i].statementDate : 'N/A'));
				}
				console.log('-------------------------------------------------');
			} else {
				console.log('No data');
			}
			mainApp.MainApp();
		}
	})
}
exports.StatementsApp = StatementsApp