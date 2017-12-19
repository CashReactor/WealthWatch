var path = require('path');
var  mainApp  =  require(path.resolve('MainApp.js'));
var  globalApp  =  require(path.resolve('Global.js'));
var  configApp  =  require(path.resolve('Config.js'));
var  request  =  require('request');
var readlineSync = require('readline-sync');
var async = require('async');
function SiteApp() {
	console.log('----------SITE APP---------');
	//Setting Site APP input parameters
	var siteName = readlineSync.question('Enter the site you want to search : ');
	globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.siteURL + '?name=' + siteName;
	globalApp.properties.options.method = globalApp.properties.get;
	globalApp.properties.headers.Authorization = 'userSession='+globalApp.properties.userSessionToken+', cobSession='+globalApp.properties.cobSessionToken;
	globalApp.properties.options.form = '';
	//Provider API call to get the list of providers
	request(globalApp.properties.options, function (error, response, body) {
		if(response.statusCode!=200){
			console.log(body);
		}
		if (!error && response.statusCode == 200) {
			var gsonParser = JSON.stringify(body);
			gsonParser=JSON.parse(gsonParser);
			for(var i = 0; i<gsonParser['provider'].length; i++) {
				console.log('Provider Id >> '+gsonParser['provider'][i].id + ' >> Name >> '+gsonParser['provider'][i].name);
			}
			var site = readlineSync.question('Enter the site id : ');
			globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.siteURL + '/' +site;
			//Provider API call to get the login form of particular provider
			request(globalApp.properties.options, function (error, response, body) {
				console.log(body);
				if  (!error  &&  response.statusCode  ==  200)  {
					mainApp.MainApp();
				}
			})
		}
	})
}

exports.SiteApp = SiteApp