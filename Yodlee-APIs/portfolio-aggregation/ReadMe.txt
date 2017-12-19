----------------------------------
Yodlee PFM/Aggregation Sample Apps
----------------------------------
 - Yodlee Sample Apps/Libraries can be used :
	i)  To Consume Yodlee PFM/Aggregation API's 
	ii) Provides seamless interaction to Yodlee API's

Note : 
	i)  Yodlee Apps/Apis are categorized into three different categories i.e. :  Authentication/PFM/Aggregation
	ii) Response From all APIs is JSON and utilities parses and provides key/value pair arrays for the same.
	iii) Account addition sample code is having an example for Non-MFA providers and MFA providers .
		Non MFA provider ID - 16441 (Dag Site)
		MFA provider ID - 16442 (Dag Site)
		There can be multiple providers, and the MFA/Non-MFA calls will vary based on the nature of providers. 
		Please follow the API documentation for more details on the same.
		For Non MFA , after Account Addition, getRefresh API should be called till the time we get refresh status as REFRESH_COMPLETE/LOGIN_FAILURE
		For MFA, refresh API should be called till we get REFRESH_COMPLETE/LOGIN_FAILURE, if we get MFA/LoginForm in intermediate steps, we should be posting MFA Challenge. For more details please refer API Documentation.
		Refresh call can be a polling call which can be made by end user after a delay of every 10-20 ms, till the time refresh is complete or login failure.
	iv) In this sample app, the credentails and other data are encrypted using the public key. 
		Public keys will be different for each customers. 
		
-------------------------------------
Software Requirements : 
-------------------------------------	
 Node.js

-------------------------------------
Node.js Installation and its setup: 
-------------------------------------
1] Download the Windows installer from the Nodes.js® web site. 
2] Run the installer (the .msi file you downloaded in the previous step.) 
3] Follow the prompts in the installer (Accept the license agreement, click the NEXT button a bunch of times and accept the default installation settings).
4] Restart the computer. Node.js® will not run till the computer is restarted.

----------------------------------------------
Steps to execute the code:
----------------------------------------------
1] Go to the cmd prompt and change the current directory to the folder containing the sample apps.
2] Execute the following command to install the required modules
	npm install request
	npm install readline-sync
	npm install async
	npm install ursa (In case of errors installing this module, please refer to URL for overcomming those: https://github.com/quartzjer/ursa)
3] Configure the Yodlee URL and credentials in the file "MainApp.js".
	Eg: baseURL : 'https://stage.api.yodlee.com/ysl/private-yodlee/v1/'
		cobrandLogin : 'yodlee',
	  	cobrandPassword : 'yodlee',
  		userLogin : 'user',
  		userPassword : 'account@123'
4] For using the PKI enabled account addition options, replace the content of the file "publickey.txt" with the public key content shared.
5] All configuration url and username passwords are mentioned in "config.js" file.
6] Run the main app as: "node MainApp.js".


----------------------------------------------
Code Snippets:
----------------------------------------------

//-----------------------------
//Get Account Details
//-----------------------------
var path = require('path');
var request  =  require('request');
...

function GetAccountDetails() {
	//1. Cobrand Login - ../cobrand/v1/login
	//2. User Login - ../user/v1/login
	
	var options  :  {
		url: 'http://192.168.211.231:8980/ysl/yodlee/accounts/v1/',
		method:  'GET',
		headers: ''
	}
	headers.authorization = 'userSession='+userSessionToken+', cobSession='+cobSessionToken;
	
	request(options,  function  (error,  response,  body)  {
		var jsonObject = JSON.parse(body);
	}
}

//----------------------------
//Transactions where Account Type  = {IRA}
//----------------------------
var path = require('path');
var request  =  require('request');
...

function GetTransactions() {
	//1. Get Cobrand Session Token - ../cobrand/v1/login
	//2. Get User Session Token - ../user/v1/login
	//3. Get Account Details and extract id using http://192.168.211.231:8980/ysl/yodlee/transactions/v1?/accounts/v1 where 'type' is IRA
	
	var options  :  {
		url: 'http://192.168.211.231:8980/ysl/yodlee/transactions/v1?accountId=12345',
		method:  'GET',
		headers: ''
	}
	headers.authorization = 'userSession=' + userSessionToken + ', cobSession=' + cobSessionToken;
	
	request(options,  function  (error,  response,  body)  {
		//Parse the Json response
		var jsonObject = JSON.parse(body);
	}
}

//-----------------------------
//Holdings where Geography <> US
//-----------------------------
var path = require('path');
var request  =  require('request');
...

function GetTransactions() {
	//1. Get Cobrand Session Token - ../cobrand/v1/login
	//2. Get User Session Token - ../user/v1/login
	
	var options  :  {
		url: 'http://192.168.211.231:8980/ysl/yodlee/holdings/v1?include=assetClassification&assetClassification.classificationType=Geography&assetClassification.classificationValue<>US',
		method:  'GET',
		headers: ''
	}
	headers.authorization = 'userSession=' + userSessionToken + ', cobSession=' + cobSessionToken;
	
	request(options,  function  (error,  response,  body)  {
		//Parse the Json response
		var jsonObject = JSON.parse(body);
	}
}

//-----------------------------
//Holdings where Sector = Telecommunications
//-----------------------------
var path = require('path');
var request  =  require('request');
...

function GetTransactions() {
	//1. Get Cobrand Session Token - ../cobrand/v1/login
	//2. Get User Session Token - ../user/v1/login
	
	var options  :  {
		url: 'http://192.168.211.231:8980/ysl/yodlee/holdings/v1?include=assetClassification&assetClassification.classificationType=Sector&assetClassification.classificationValue=Telecommunications',
		method:  'GET',
		headers: ''
	}
	headers.authorization = 'userSession=' + userSessionToken + ', cobSession=' + cobSessionToken;
	
	request(options,  function  (error,  response,  body)  {
		//Parse the Json response
		var jsonObject = JSON.parse(body);
	}
}

//-----------------------------
//Holdings contain Holding Type = Mutual Fund
//-----------------------------
var path = require('path');
var request  =  require('request');
...

function GetTransactions() {
	//1. Get Cobrand Session Token - ../cobrand/v1/login
	//2. Get User Session Token - ../user/v1/login
	
	var options  :  {
		url: 'http://192.168.211.231:8980/ysl/yodlee/holdings/v1?holdingType=mutualFund',
		method:  'GET',
		headers: ''
	}
	headers.authorization = 'userSession=' + userSessionToken + ', cobSession=' + cobSessionToken;
	
	request(options,  function  (error,  response,  body)  {
		//Parse the Json response
		var jsonObject = JSON.parse(body);
	}
}

//-----------------------------
//Holdings where Account Type <> 401k
//-----------------------------
var path = require('path');
var request  =  require('request');
...

function GetTransactions() {
	//1. Get Cobrand Session Token - ../cobrand/v1/login
	//2. Get User Session Token - ../user/v1/login
	//3. Get Account Details and extract id using http://192.168.211.231:8980/ysl/yodlee/transactions/v1?/accounts/v1 where 'type' is not 401k
	
	var options  :  {
		url: 'http://192.168.211.231:8980/ysl/yodlee/holdings/v1?accountId=12345',
		method:  'GET',
		headers: ''
	}
	headers.authorization = 'userSession=' + userSessionToken + ', cobSession=' + cobSessionToken;
	
	request(options,  function  (error,  response,  body)  {
		//Parse the Json response
		var jsonObject = JSON.parse(body);
	}
}
