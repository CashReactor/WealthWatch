var path = require('path');
var siteApp = require(path.resolve('aggregation/SiteApp.js'));
var accountApp = require(path.resolve('pfm/AccountApp.js'));
var statementsApp = require(path.resolve('pfm/StatementsApp.js'));
var transactionsApp = require(path.resolve('pfm/TransactionsApp.js'));
var holdingsApp = require(path.resolve('pfm/HoldingsApp.js'));
var derivedApp = require(path.resolve('pfm/PortfolioApp.js'));
var globalApp = require(path.resolve('Global.js'));
var configApp = require(path.resolve('Config.js'));
var addSiteAccount = require(path.resolve('aggregation/AddSiteAccount.js'));
var addProviderAccount = require(path.resolve('aggregation/AddProviderAccount.js'));
var addProviderAccountMFA = require(path.resolve('aggregation/AddProviderAccountMFA.js'));
var addSiteAccountMFA = require(path
		.resolve('aggregation/AddSiteAccountMFA.js'));
var request = require('request');
var readlineSync = require('readline-sync');
var async = require('async');

//Setting input parameters for cobrand login API call
globalApp.properties.options.url = configApp.properties.baseURL
		+ globalApp.properties.cobrandLoginURL;
console.log(configApp.properties.baseURL);
console.log(globalApp.properties.cobrandLoginURL);


globalApp.properties.options.method = globalApp.properties.post;
globalApp.properties.options.headers = globalApp.properties.headers;
globalApp.properties.options.json = configApp.properties.cobrandParam
//Invoking Cobrand login API
request(
		globalApp.properties.options,

		function(error, response, body) {
			//console.log("form"+JSON.stringify(response));
			if (error) {
				return console.log('Error in Cobrand login: ', error);
console("error");

			}
			if (!error && response.statusCode == 200) {

				//Setting input parameters for user login API call
				globalApp.properties.cobSessionToken = body.session.cobSession;
				globalApp.properties.options.url = configApp.properties.baseURL+globalApp.properties.userLoginURL;

				globalApp.properties.options.method = globalApp.properties.post;
				globalApp.properties.headers.Authorization = 'cobSession='
						+ globalApp.properties.cobSessionToken;
				globalApp.properties.options.json = configApp.properties.userParam;

				//Invoking user login API
				request(
						globalApp.properties.options,
						function(error, response, body) {

							if (error) {
								return console.log('Error in User login: ',
										error);
							}
							if (!error && response.statusCode == 200) {

								//var jsonObj = JSON.parse(body);

								globalApp.properties.userSessionToken = body.user.session.userSession;

								MainApp();

							}

						})
			}
		})

function MainApp() {
	console.log('-----------------------------------------------');
	console.log('YSL PFM/Aggregation Sample Apps');
	console.log('-----------------------------------------------');
	console.log('1. Site Search');
	console.log('2. Add Site Account (Non MFA)');
	console.log('3. Add Site Account (MFA)');
	//console.log('4. Add Site Account (Non MFA) - With PKI Encryption');
	//console.log('5. Add Site Account (MFA) - With PKI Encryption');
	console.log('4. Add Provider Account (Non MFA)-NEW');
	console.log('5. Add Provider Account (MFA)-NEW');
	console.log('6. Accounts');
	console.log('7. Statements');
	console.log('8. Transactions');
	console.log('9. Holdings');
	console.log('10. Derived');
	console.log('0. Exit');
	console.log('-----------------------------------------------');
	var choice = readlineSync.question('Enter your choice: ');
	switch (choice) {
	case '1':
		siteApp.SiteApp();
		break;
	case '2':
		addSiteAccount.AddSiteAccount(0);
		break;
	case '3':
		addSiteAccountMFA.AddSiteAccountMFA(0);
		break;
	case '411':
		addSiteAccount.AddSiteAccount(1);
		break;
	case '511':
		addSiteAccountMFA.AddSiteAccountMFA(1);
		break;
	case '4':
		addProviderAccount.AddProviderAccount();
		break;
	case '5':
	    addProviderAccountMFA.AddProviderAccountMFA(0);
		break;
	case '6':
		accountApp.AccountApp();
		break;
	case '7':
		statementsApp.StatementsApp();
		break;
	case '8':
		transactionsApp.TransactionsApp();
		break;
	case '9':
		holdingsApp.HoldingsApp();
		break;
	case '10':
		derivedApp.PortfolioApp();
		break;
	case '0':
		process.exit();
	default:
		MainApp();
		break;
	}
}
exports.MainApp = MainApp