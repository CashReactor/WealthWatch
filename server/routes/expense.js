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

expenseRouter.delete('/oneExpense', (req, res) => {
  const { user, expenseId } = req.query;
  User.findOne({ email: user })
    .then((user) => {
      const { oneTime } = user;
      for (let i = 0; i < oneTime.length; i++) {
        if (oneTime[i]._id.toString() === expenseId) {
          const deletedOneTime = oneTime.splice(i, 1);
          user.save();
          return deletedOneTime;
        }
      }
    })
    .then((deletedOneExpense) => {
      res.status(200).json({ message: 'Expense deleted', data: deletedOneExpense });
    });
});

expenseRouter.delete('/recExpense', (req, res) => {
  const { user, expenseId } = req.query;
  User.findOne({ email: user })
    .then((user) => {
      const { recurring } = user;
      for (let i = 0; i < recurring.length; i++) {
        if (recurring[i]._id.toString() === expenseId) {
          const deletedRecurring = recurring.splice(i, 1);
          user.save();
          return deletedRecurring;
        }
      }
    })
    .then((deletedRecurringExpense) => {
      res.status(200).json({ message: 'Expense deleted', data: deletedRecurringExpense });
    });
});

module.exports.expense = expenseRouter;
