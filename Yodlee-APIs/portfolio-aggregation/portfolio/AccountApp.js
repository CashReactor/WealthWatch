var path = require('path');
var  mainApp  =  require(path.resolve('MainApp.js'));
var  globalApp  =  require(path.resolve('Global.js'));
var  configApp  =  require(path.resolve('Config.js'));
var  request  =  require('request');
var readlineSync = require('readline-sync');
var async = require('async');
function AccountApp(){
	
	console.log('---------------------------------------------------------------');
	console.log('Account APP');
	console.log('---------------------------------------------------------------');
	console.log('1. Account Details');
	console.log('2. Investment Options');
	console.log('0. Exit');
	console.log('Any other key for main options');
	console.log('---------------------------------------------------------------');
	
	var selectedAccountOption = readlineSync.question('Enter your choice: ');
	switch (selectedAccountOption) {
		case '1':
			accountDetails();
			break;
		case '2':
			investmentOptions();
			break;
		case '0':
			process.exit();
		default:
			mainApp.MainApp();
			break;
	}
}

function accountDetails(){
	//Setting the input parameters for Account API Call
	globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.accountURL;
	globalApp.properties.options.method = globalApp.properties.get;
	globalApp.properties.options.headers.Authorization = 'userSession='+globalApp.properties.userSessionToken+', cobSession='+globalApp.properties.cobSessionToken;
	//Invoking the Account API Call
	console.log('-----------------------------------------------------');
	console.log('Account : Account Id, Container, AccountName, Balance');
	console.log('-----------------------------------------------------');
	request(globalApp.properties.options,  function  (error,  response,  body)  {
		if(body.length >2) {
			if(!(body.indexOf("errorCode") > 0)) {
				if  (!error  &&  response.statusCode  ==  200)  {
					var gson = JSON.parse(body);
					for(var i = 0; i<gson.account.length; i++) {
						console.log(gson.account[i].id + ' - ' + gson.account[i].CONTAINER + ' - ' + gson.account[i].accountName + ' - ' + (gson.account[i].balance !== undefined ? gson.account[i].balance.amount : '0'));
					}
				} else {
					console.log('No data');
				}
				console.log('-----------------------------------------------------');
			} else {
				console.log('No data');
			}
			AccountApp();
		}
	})
}

function investmentOptions(){
	//Setting the input parameters for Account Investment Options API Call
	globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.investmentOptionsURL;
	globalApp.properties.options.method = globalApp.properties.get;
	globalApp.properties.options.headers.Authorization = 'userSession='+globalApp.properties.userSessionToken+', cobSession='+globalApp.properties.cobSessionToken;
	//Invoking the Account API Call
	console.log('-----------------------------------------------------------------');
	console.log('Account : Account Id');
	console.log('	- Investment Plan : Plan Name, Provider Name');
	console.log('		- Options : Cusip Number, Description, Holding Type, Price');
	console.log('-----------------------------------------------------------------');
	request(globalApp.properties.options,  function  (error,  response,  body)  {
		if(body.length >2) {
			if(!(body.indexOf("errorCode") > 0)) {
				if  (!error  &&  response.statusCode  ==  200)  {
					var gson = JSON.parse(body);
					for(var i = 0; i < gson.account.length; i++) {
						if (gson.account[i].investmentPlan !== undefined) {
							console.log('Account : ' + gson.account[i].id);
							console.log('	- Investment Plan : ' + gson.account[i].investmentPlan.planName + ', ' + gson.account[i].investmentPlan.providerName);
							if (gson.account[i].investmentPlan.investmentOption !== undefined) {
								for (var j = 0; j < gson.account[i].investmentPlan.investmentOption.length; j++) {
									console.log('		- Options : ' + gson.account[i].investmentPlan.investmentOption[j].cusipNumber + ', ' + gson.account[i].investmentPlan.investmentOption[j].description + ', ' + gson.account[i].investmentPlan.investmentOption[j].holdingType + ', ' + gson.account[i].investmentPlan.investmentOption[j].price);
								}
							}
						}
					}
				} else {
					console.log('No data');
				}
				console.log('-----------------------------------------------------------------');
			} else {
				console.log('No data');
			}
		}
		else {
			console.log('No data');
		}
		AccountApp();
	})
}

exports.AccountApp = AccountApp