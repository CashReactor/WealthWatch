var path = require('path');
var mainApp = require(path.resolve('MainApp.js'));
var globalApp = require(path.resolve('Global.js'));
var configApp = require(path.resolve('Config.js'));
//var PKI = require(path.resolve('util/PKI_Library.js'));
var request = require('request');
var readlineSync = require('readline-sync');
var async = require('async');
function AddProviderAccount() {
	console.log('------------AddProviderAccount-----------');
	var pId = readlineSync.question('Enter the providerId : ');
	globalApp.properties.options.url = configApp.properties.baseURL
			+ globalApp.properties.siteURL + '/'+pId;
			globalApp.properties.options.method = globalApp.properties.get;
	globalApp.properties.options.headers.Authorization = 'userSession='
			+ globalApp.properties.userSessionToken + ', cobSession='
			+ globalApp.properties.cobSessionToken;
			request(
		globalApp.properties.options, function(error, response, body) {
			
			var res= JSON.stringify(response);
			if (error) {
				return console.log('Error:', error);
			}
			if (!error && response.statusCode == 200) {
				var gsonParser2 = JSON.stringify(body);
			gsonParser2=JSON.parse(gsonParser2);
					gsonParser2.provider[0]['loginForm']['row'][0].field[0]['value'] = "spendings.site16441.2";
					gsonParser2.provider[0]['loginForm']['row'][1].field[0]['value'] = "site16441.2";
					var gsonP=gsonParser2.provider[0]['loginForm'];
					var json1=JSON.stringify('{"loginForm" :'+JSON.stringify(gsonP)+'}');
					var json2=JSON.parse(json1);
					var json3=JSON.parse(json2);
					
			}
				AddProviderAccountForGivenJson(json3);
			}

			)
          }	

function AddProviderAccountForGivenJson(json3) {
	
	request( 
			{
    url: configApp.properties.baseURL
							+ globalApp.properties.siteURLNEW
							+ '16441',
    method: 'POST',
    headers : {'Authorization' : 'userSession='
			+ globalApp.properties.userSessionToken
			+ ', cobSession='
			+ globalApp.properties.cobSessionToken},
	json : json3
},
			function(error, response, body) {
				console.log('response.statusCode : ' + response.statusCode);
				console.log(body);
				if (error) {
					return console.log('Error:', error);
				}
				if (!error && response.statusCode == 201) {
					var gsonParser3 = JSON.stringify(body);
					var gsonP1=JSON.parse(gsonParser3);
					globalApp.properties.options.url = configApp.properties.baseURL
							+ globalApp.properties.refreshURLNEW
							+ gsonP1.providerAccount.id;
					globalApp.properties.options.method = globalApp.properties.get;
					globalApp.properties.options.headers.Authorization = 'userSession='
							+ globalApp.properties.userSessionToken
							+ ', cobSession='
							+ globalApp.properties.cobSessionToken;
					globalApp.properties.options.form = '';
					flag = '';
					console
							.log('\tProviderAccountID \t     RefreshStatus');
					async
							.whilst(
									function() {
										return flag != 'SUCCESS';
									},
									function(next) {
										request(
												globalApp.properties.options,
												function(
														error,
														response,
														body) {
													if (!error
															&& response.statusCode == 200
															&& body.length != 0) {
														var gson = JSON.stringify(body);
			                                            gson=JSON.parse(gson);
														console
																.log('\t'
																		+ gson.providerAccount.id
																		+ ' \t   '
															+ gson.providerAccount.refreshInfo.status);
														flag = gson.providerAccount.refreshInfo.status;
														
													}
													next();
												});
									}, function(err) {
										mainApp.MainApp();
									});
				}
			}
	)
}

exports.AddProviderAccount = AddProviderAccount
