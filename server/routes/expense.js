const express = require('express');

const router = express.Router();

const { User } = require('../../database/models/user');
const { Rec } = require('../../database/models/recurring');

router.post('/recExpense', (req, res) => {
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
      console.log(updatedUser);
      res.send(updatedUser);
      res.end();
    });
  });
});

module.exports.expense = router;
