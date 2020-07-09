const Transaction = require('../models/Transaction');
const Validation = require('../requests/Validation');
const UserController = require('./UserController');

class TransactionsController {

    // add a new Transasction [Expense/Income]
    async newTransaction(request, response) {
        const result = Validation.NEWTRANSACTION(request.body);

        if (result.error) {
            let error = result.error.details[0];
            response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } });
        } else {
            if (result.value.type === "Expense") {
                UserController.addExpense(result.value.creator, result.value.amount);
            } else {
                UserController.addIncome(result.value.creator, result.value.amount);
            }
            try {
                let newTransaction = new Transaction(result.value);
                let saved = await newTransaction.save();
                let transaction = await saved.populate("category").execPopulate();
                response.status(201).json({ success: true, message: `Transaction recorded!`, transaction: transaction });
            } catch (error) {
                response.status(500).json({ success: false, error: error.message });
            }
        }
    }

    // view a transaction
    async getTransaction(request, response) {
        let transaction = await Transaction.findById(request.params.id).populate('category');
        if (!transaction) {
            response.status(404).json({ success: false, message: "Transaction does not exist!" });
        } else {
            response.status(200).json({ success: true, transaction: transaction });
        }
    }

    // update a transaction
    async updateTransaction(request, response) {
        const result = Validation.NEWTRANSACTION(request.body);

        if (result.error) {
            let error = result.error.details[0];
            response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } });
        } else {
            try {
                let transactionId = request.params.id;
                let { note, amount, type, date, category } = result.value;

                let transaction = await Transaction.findOneAndUpdate({ _id: transactionId }, { note, amount, type, date, category }, { new: true }).populate('category');
                if (!transaction) {
                    response.status(404).json({ success: false, message: "Transaction does not exist!" });
                } else {
                    response.status(201).json({ success: true, message: "Transaction updated!", transaction: transaction });
                }
            } catch (error) {
                response.status(500).json({ success: false, error: error.message });
            }
        }
    }

    // delete a Transaction
    async deleteTransaction(request, response) {
        try {
            let transaction = await Transaction.findOneAndDelete({ _id: request.params.id }).populate('category');
            if (!transaction) {
                response.status(404).json({ success: false, message: "Transaction does not exist!" });
            } else {
                response.status(200).json({ success: true, message: `${transaction.note} deleted successfully!`, transaction: transaction });
            }
        } catch (error) {
            response.status(500).json({ success: false, error: error.message });
        }
    }

    // get users transcations
    async getMyTransactions(request, response) {
        let creator = request.params.creator;
        try {
            let myTransactions = await Transaction.find({ creator: creator }).sort({ createdAt: -1 }).populate('category');
            if (myTransactions.length < 1) {
                response.status(204).json({ success: true, message: "You do not have any transaction yet!" });
            } else {
                response.status(200).json({ success: true, myTransactions: myTransactions });
            }
        } catch (error) {
            response.status(500).json({ success: false, error: error.message });
        }
    }

    // get expense transcations
    async getExpenseTransactions(request, response) {
        let creator = request.params.creator;
        try {
            let myTransactions = await Transaction.find({ creator: creator, type: "Expense" }).sort({ createdAt: -1 }).populate('category');
            if (myTransactions.length < 1) {
                response.status(204).json({ success: true, message: "No expense transaction yet!" });
            } else {
                response.status(200).json({ success: true, myTransactions: myTransactions });
            }
        } catch (error) {
            response.status(500).json({ success: false, error: error.message });
        }
    }

    // get income transcations
    async getIncomeTransactions(request, response) {
        let creator = request.params.creator;
        try {
            let myTransactions = await Transaction.find({ creator: creator, type: "Income" }).sort({ createdAt: -1 }).populate('category');
            if (myTransactions.length < 1) {
                response.status(204).json({ success: true, message: "No income transaction yet!" });
            } else {
                response.status(200).json({ success: true, myTransactions: myTransactions });
            }
        } catch (error) {
            response.status(500).json({ success: false, error: error.message });
        }
    }
}


module.exports = new TransactionsController();