const express = require('express');

const expenseRouter = express.Router();

const { User } = require('../../database/models/user');
const { Rec } = require('../../database/models/recurring');
const { One } = require('../../database/models/oneTime');

expenseRouter.post('/oneExpense', (req, res) => {
  const {
    email, expense, amount, transactionDate, category,
  } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) throw err;
    const oneExpenses = user.oneTime;
    const oneExpense = new One({
      expense,
      amount,
      date: transactionDate,
      category,
    });
    oneExpenses.push(oneExpense);
    User.findOneAndUpdate({ email }, { oneTime: oneExpenses }, { new: true }, (err, updatedUser) => {
      if (err) res.status(400).json({ message: err });
      res.send(updatedUser);
      res.end();
    });
  });
});

expenseRouter.post('/recExpense', (req, res) => {
  const {
    email, expense, amount, period, category, startDate,
  } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) res.status(400).json({ message: err });
    const recExpenses = user.recurring;
    const recExpense = new Rec({
      expense,
      amount,
      period,
      category,
      startDate,
    });
    recExpenses.push(recExpense);
    User.findOneAndUpdate({ email }, { recurring: recExpenses }, { new: true }, (error, updatedUser) => {
      if (error) res.status(400).json({ message: error });
      res.send(updatedUser);
      res.end();
    });
  });
});

expenseRouter.post('/fetchOneExpenses', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    res.send(user.oneTime);
    res.end();
  });
});

expenseRouter.post('/fetchRecExpenses', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    res.send(user.recurring);
    res.end();
  });
});

module.exports.expense = expenseRouter;
