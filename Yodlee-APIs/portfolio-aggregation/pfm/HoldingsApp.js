var path = require('path');
var  mainApp  =  require(path.resolve('MainApp.js'));
var  globalApp  =  require(path.resolve('Global.js'));
var  configApp  =  require(path.resolve('Config.js'));
var  request  =  require('request');
var readlineSync = require('readline-sync');
var async = require('async');
function HoldingsApp(){
	
	console.log('---------------------------------------------------------------');
	console.log('Holdings APP');
	console.log('---------------------------------------------------------------');
	console.log('1. All Holdings');
	console.log('2. Holdings with Asset Info');
	console.log('3. Holdings with Asset Info By Classification Filter');
	console.log('0. Exit');
	console.log('Any other key for main options');
	console.log('---------------------------------------------------------------');
	
	var selectedHoldingOption = readlineSync.question('Enter your choice: ');
	switch (selectedHoldingOption) {
		case '1':
			allHoldings();
			break;
		case '2':
			holdingsWithAssetClassification(globalApp.properties.holdingsAssetClassificationURL);
			break;
		case '3':
			holdingsWithAssetClassification(globalApp.properties.holdingsAssetClassificationFilterURL);
			break;
		case '0':
			process.exit();
		default:
			mainApp.MainApp();
			break;
	}
	
	
}

function allHoldings(){
	//Setting the input parameters for Holdings API Call
	globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.holdingsURL;
	globalApp.properties.options.method = globalApp.properties.get;
	globalApp.properties.options.headers.Authorization = 'userSession='+globalApp.properties.userSessionToken+', cobSession='+globalApp.properties.cobSessionToken;
	
	console.log('--------------------------------------------------------------------');
	console.log('Holding Info : HoldingId, AccountId, Description, HoldingType, Value');
	console.log('--------------------------------------------------------------------');
	//Invoking the Holdings API Call
	request(globalApp.properties.options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			if(body.length > 2) {
				var gson = JSON.parse(body);
				for(var i = 0; i<gson.holding.length; i++) {
					if(gson.holding[i].id !== undefined) {
						if(gson.holding[i].value !== undefined) {
							console.log('Holding Info : ' + gson.holding[i].id + ', ' + gson.holding[i].accountId + ', ' + gson.holding[i].description + ', ' + gson.holding[i].holdingType + ', ' + gson.holding[i].value.amount);
						}
						else {
							console.log('Holding Info : ' + gson.holding[i].id + ', ' + gson.holding[i].accountId + ', ' + gson.holding[i].description + ', ' + gson.holding[i].holdingType + ', 0');
						}
					}
				}
				console.log('--------------------------------------------------------------------');
			} else {
				console.log('No data');
			}
			HoldingsApp();
		}
	})
}

function holdingsWithAssetClassification(URI){
	//Setting the input parameters for Holdings API Call
	globalApp.properties.options.url = configApp.properties.baseURL + URI;
	globalApp.properties.options.method = globalApp.properties.get;
	globalApp.properties.options.headers.Authorization = 'userSession='+globalApp.properties.userSessionToken+', cobSession='+globalApp.properties.cobSessionToken;
	
	console.log('-------------------------------------------------------------------------------');
	console.log('Holding Info : HoldingId, AccountId, Description, HoldingType, Value');
	console.log('	- Asset Classification : ClassificationType, ClassificationValue, Allocation');
	console.log('-------------------------------------------------------------------------------');
	//Invoking the Holdings API Call
	request(globalApp.properties.options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			if(body.length > 2) {
				var gson = JSON.parse(body);
				for(var i = 0; i<gson.holding.length; i++) {
					if(gson.holding[i].id !== undefined) {
						if(gson.holding[i].value !== undefined) {
							console.log('Holding Info : ' + gson.holding[i].id + ', ' + gson.holding[i].accountId + ', ' + gson.holding[i].description + ', ' + gson.holding[i].holdingType + ', ' + gson.holding[i].value.amount);
						}
						else {
							console.log('Holding Info : ' + gson.holding[i].id + ', ' + gson.holding[i].accountId + ', ' + gson.holding[i].description + ', ' + gson.holding[i].holdingType + ', 0');
						}
						if (gson.holding[i].assetClassification != undefined) {
							for(var j = 0; j < gson.holding[i].assetClassification.length; j++) {
								console.log('	- Asset Classification : ' + gson.holding[i].assetClassification[j].classificationType + ', ' + gson.holding[i].assetClassification[j].classificationValue + ', ' + gson.holding[i].assetClassification[j].allocation);
							}
						}
					}
				}
				console.log('-------------------------------------------------------------------------------');
			} else {
				console.log('No data');
			}
			HoldingsApp();
		}
	})
}

exports.HoldingsApp = HoldingsApp