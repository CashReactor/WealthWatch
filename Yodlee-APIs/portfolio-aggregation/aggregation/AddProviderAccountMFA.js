var path = require('path');
var  mainApp  =  require(path.resolve('MainApp.js'));
var  globalApp  =  require(path.resolve('Global.js'));
var  configApp  =  require(path.resolve('Config.js'));
var  PKI  =  require(path.resolve('util/PKI_Library.js'));  
var  request  =  require('request');  
var readlineSync = require('readline-sync');  
var async = require('async');    

function AddProviderAccountMFA(isPkiEnabled){
	console.log('------------AddSiteAccountMFA-----------');
	var pId = readlineSync.question('Enter the providerId : ');
	console.log('Adding site with Dag Site ID: 16442');
	//Setting the input parameters for Add Account API Call
	globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.siteURL + '/'+pId;
	globalApp.properties.options.method = globalApp.properties.get;
	globalApp.properties.options.headers.Authorization = 'userSession='+globalApp.properties.userSessionToken+', cobSession='+globalApp.properties.cobSessionToken;
	request(globalApp.properties.options, function (error, response, body) {
		if(error) {
			return console.log('Error:', error);
		}
		if (!error && response.statusCode == 200) {
			var gsonParser2 = JSON.stringify(body);
			gsonParser2=JSON.parse(gsonParser2);
			if(isPkiEnabled) {
				gsonParser2.provider[0]['loginForm']['row'][0].field[0]['value'] = PKI.encrypt("DBmet1.site16442.1");
				gsonParser2.provider[0]['loginForm']['row'][1].field[0]['value'] = PKI.encrypt("site16442.1");
			} else {
				    gsonParser2.provider[0]['loginForm']['row'][0].field[0]['value'] = "ysljs.site16442.2";
					gsonParser2.provider[0]['loginForm']['row'][1].field[0]['value'] = "site16442.2";
					var gsonP=gsonParser2.provider[0]['loginForm'];
					var json1=JSON.stringify('{"loginForm" :'+JSON.stringify(gsonP)+'}');
					var json2=JSON.parse(json1);
					var json3=JSON.parse(json2);
					//console.log("json1"+json1);
				
			}
			
			request({
    url: configApp.properties.baseURL
							+ globalApp.properties.siteURLNEW
							+ '16442',
    method: 'POST',
    headers : {'Authorization' : 'userSession='
			+ globalApp.properties.userSessionToken
			+ ', cobSession='
			+ globalApp.properties.cobSessionToken},
			json : json3
},
 function (error, response, body) {
	 console.log("body---"+JSON.stringify(body));
				if (!error && response.statusCode == 201) {
					var gsonParser3 = JSON.stringify(body);
					var gsonP1=JSON.parse(gsonParser3)
					var provAccId = gsonP1.providerAccount.id;
					flag = '';
					//console.log('\tProviderAccountID \t     RefreshStatus');
					async.whilst(function () {
						return flag != 'SUCCESS';
					},
					function (next) {
						globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.refreshURLNEW+ provAccId;
						globalApp.properties.options.method = globalApp.properties.get;
						globalApp.properties.options.headers.Authorization = 'userSession='+globalApp.properties.userSessionToken+', cobSession='+globalApp.properties.cobSessionToken;
						globalApp.properties.options.form = '';
						request(globalApp.properties.options, function (error, response, body) {
							if(error) {
								return console.log('Error:', error);
							}
							if (!error && response.statusCode == 200 && body.length != 0) {
								//console.log("body"+JSON.stringify(body));
								var gson = JSON.stringify(body);
			                    gson=JSON.parse(gson);
								flag = gson.providerAccount.refreshInfo.status;
								console.log('\t'+provAccId+' \t  '+gson.providerAccount.refreshInfo.status);
								if(flag == 'FAILED') {
									console.log('Please try again');
									mainApp.MainApp();
								} else if(gson.providerAccount.loginForm != undefined) {
									if(flag != 'FAILED' && flag != 'SUCCESS') {
										//console.log(gson.providerAccount.loginForm.formType);
										if(gson.providerAccount.loginForm.formType == 'token') {
											gson.providerAccount.loginForm.row[0].field[0].value = "123456";
											var reqBody = '{"loginForm" :'+JSON.stringify(gson.providerAccount.loginForm)+'}';
											reqBody=JSON.parse(reqBody);
											
											//reqBody = "MFAChallenge="+reqBody;
											console.log('Populated loginForm: '+JSON.stringify(gson.providerAccount.loginForm));
											console.log('Token verification in-progress...');
											globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.sitesURL+ provAccId;
											globalApp.properties.options.method = globalApp.properties.put;
											globalApp.properties.options.headers.Authorization = 'userSession='+globalApp.properties.userSessionToken+', cobSession='+globalApp.properties.cobSessionToken;
											globalApp.properties.options.form = reqBody;
											console.log("globalApp.properties.options--"+JSON.stringify(globalApp.properties.options));
											request({
    url: configApp.properties.baseURL + globalApp.properties.sitesURL+ provAccId,
    method: 'PUT',
    headers : {'Authorization' : 'userSession='
			+ globalApp.properties.userSessionToken
			+ ', cobSession='
			+ globalApp.properties.cobSessionToken},
			json : reqBody
}, function (error, response, body) {
												console.log("body---"+JSON.stringify(body));
												if(error){
													return console.log('Error:', error);
												}
												if (!error && response.statusCode == 200) {
													console.log('\t'+provAccId+' \t  '+gson.providerAccount.refreshInfo.status);
													console.log('Token verification process successfull!!!!');
												}
											})
										} else if(gson.providerAccount.loginForm.formType == 'questionAndAnswer') {
											if(isPkiEnabled) {
												gson.providerAccount.loginForm.row[0].field[0].value = PKI.encrypt("Texas");
												gson.providerAccount.loginForm.row[1].field[0].value = PKI.encrypt("w3schools");
											} else {
												gson.providerAccount.loginForm.row[0].field[0].value = "Texas";
												gson.providerAccount.loginForm.row[1].field[0].value = "w3schools";
											}
											//var reqBody = "MFAChallenge="+JSON.stringify(gson);
											var reqBody = '{"loginForm" :'+JSON.stringify(gson.providerAccount.loginForm)+'}';
											reqBody=JSON.parse(reqBody);
											console.log('Populated loginForm: '+JSON.stringify(gson.providerAccount.loginForm));
											console.log('QnA verification in-progress...');
											globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.sitesURL+ provAccId;
											globalApp.properties.options.method = globalApp.properties.put;
											globalApp.properties.options.headers.Authorization = 'userSession='+globalApp.properties.userSessionToken+', cobSession='+globalApp.properties.cobSessionToken;
											globalApp.properties.options.form = reqBody;
											request({
    url: configApp.properties.baseURL + globalApp.properties.sitesURL+ provAccId,
    method: 'PUT',
    headers : {'Authorization' : 'userSession='
			+ globalApp.properties.userSessionToken
			+ ', cobSession='
			+ globalApp.properties.cobSessionToken},
			json : reqBody
			}, function (error, response, body) {
				console.log("body---"+JSON.stringify(body));
												if(error) {
													return console.log('Error:', error);
												}
												if (!error && response.statusCode == 200) {
													console.log('\t'+provAccId+' \t  '+gson.providerAccount.refreshInfo.status);
													console.log('QnA verification process successfull!!!!');
												}
											})
										}
									}
								}
							}
							next();
						});
					},
					function (err) {
						mainApp.MainApp();
					});
					}
				})
				}
		})
		}
		exports.AddProviderAccountMFA = AddProviderAccountMFA  
