var yTrans = require('yodlee-transactions');
var yodlee = require('yodlee.js');
var cobrandUser = ""; //example format in sbCobxxxxx
var cobrandPassword = ""; //format is xxxx-xxx-xxx-xxx-xxxx the number of x is not accurate
var userName = ""; //example formats are sbMemxxxxx
var userPassword = ""; //example formate are in sbMemxxxxx
var cobSessionToken = "";
var userSessionToken = "";
var accounts = [];


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


generateCobToken(cobrandUser, cobrandPassword)
  .then(generateUserToken(userName, userPassword))
  .then(function(){
    getAccounts();
    getTransactions()
      .then(getCategorySpending);
  })