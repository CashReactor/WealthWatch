var yTrans = require('yodlee-transactions');
var yodlee = require('yodlee.js');
var cobrandUser = ""; //example format in sbCobxxxxx
var cobrandPassword = ""; //format is xxxx-xxx-xxx-xxx-xxxx the number of x is not accurate
var userName = ""; //example formats are sbMemxxxxx
var userPassword = ""; //example formate are in sbMemxxxxx
var cobSessionToken = "";
var userSessionToken = "";
var accounts = [];


/*
UserName: mrmaclean89@gmail.com
PW: WealthWatch

Cobrand Login:  sbCobd1701be3e402ae0e9cfd41f581772d8e9a
Cobrand PW: 70fd20c1-2fab-4ff2-83d7-9383a7e643fb

Cobrand Token: 08062013_2:8f98ce67aa2aa5f10c17f7800368d48dfe95fb7ce64c9963158d728b31f5bd4300c803f6ad9fa374209015d52b2512676860e18aecec708758cdb12b4e7597ac
User Token: 08062013_1:6fadc373d6be4482cd62b3e77466c8b7b5151d833ab2c2ca4186181b8819955ea879a154a712ff34a8d25e7e7c7a1c0686a408b4f120ca4a6149c02ade45564d

SAMPLE USER DATA:

# User Name User Password FastLink

1
sbMemd1701be3e402ae0e9cfd41f581772d8e9a1  sbMemd1701be3e402ae0e9cfd41f581772d8e9a1#123
FastLink for Aggregation
FastLink for Account Verification

2
sbMemd1701be3e402ae0e9cfd41f581772d8e9a2  sbMemd1701be3e402ae0e9cfd41f581772d8e9a2#123
FastLink for Aggregation
FastLink for Account Verification

3
sbMemd1701be3e402ae0e9cfd41f581772d8e9a3  sbMemd1701be3e402ae0e9cfd41f581772d8e9a3#123
FastLink for Aggregation
FastLink for Account Verification

4
sbMemd1701be3e402ae0e9cfd41f581772d8e9a4  sbMemd1701be3e402ae0e9cfd41f581772d8e9a4#123
FastLink for Aggregation
FastLink for Account Verification

5
sbMemd1701be3e402ae0e9cfd41f581772d8e9a5  sbMemd1701be3e402ae0e9cfd41f581772d8e9a5#123
FastLink for Aggregation
FastLink for Account Verification

*/


function generateCobToken(cobrandUser, cobrandPassword){
  return yodlee.getCobSession(cobrandUser, cobrandPassword)
    .then(function(data){
      var dataObj = JSON.parse(data);
      cobSessionToken = dataObj.session.cobSession;
      return cobSessionToken;
    });
}

function generateUserToken(userName, userPassword){
  return function(cobSessionToken){
    return yodlee.getUserSession(cobSessionToken, userName, userPassword)
      .then(function(user){
        var userObj = JSON.parse(user);
        userSessionToken = userObj.session.userSession;
        return userSessionToken;
      });
  }
}

function getAccounts() {
  return yodlee.getAccounts(cobSessionToken, userSessionToken)
    .then(function(data){
      var dataObj = JSON.parse(data);
      accounts = [] //clearing it out kind of
      for (var k in dataObj){
        if (dataObj.hasOwnProperty(k)){
          accounts.push(dataObj[k]);
        }
      }
    })
}

function getTransactions(accountId, fromDate, toDate) {
  return yodlee.getTransactions(cobSessionToken, userSessionToken, accountId, fromDate, toDate)
    .then(function(data){
      return JSON.parse(data);
    })
}

function getCategorySpending(transactionObj) {
  return yodlee.getCategorySpending(transactionObj);
}


function getAllUserInfo() {
  return generateCobToken(cobrandUser, cobrandPassword)
  .then(generateUserToken(userName, userPassword))
  .then(function(){
    getAccounts();
    getTransactions()
      .then(getCategorySpending);
  });
};



