const Event = require('../models/events.js');
const mongoose = require('mongoose');

const addTransaction = async (req, res) => {

    const { eventId } = req.params;
  const { amount, type } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const newTransaction = {
      amount,
      type
    };

    event.expenses.push(newTransaction);

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

const deleteTransaction = async (req, res) => {
    const { eventId } = req.params;
    const { transactionId } = req.body;
  
    try {
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      const transactionIndex = event.expenses.findIndex(
        (transaction) => transaction._id && transaction._id.toString() === transactionId
      );
  
      if (transactionIndex === -1) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
  
      event.expenses.splice(transactionIndex, 1);
      await event.save();
  
      res.status(200).json(event);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
const updateTransaction = async (req, res) => {
    const { eventId } = req.params;
    const { transactionId, amount, type } = req.body;
  
    try {
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
     
  
      const transaction = event.expenses.find((transaction) => {
     
        return transaction._id.toString() === transactionId.toString();
      });
  
    
  
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
  
      transaction.amount = amount;
      transaction.type = type;
  
      await event.save();
  
      res.status(200).json(event);
    } catch (error) {
      console.error('Error editing transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

const getTransactions = async (req, res) => {
    const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const transactions = event.expenses;

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { addTransaction, deleteTransaction, updateTransaction, getTransactions};