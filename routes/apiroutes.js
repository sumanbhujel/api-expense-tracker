const express = require('express');
const SignUpController = require('../controllers/auth/SignupController');
const SignInController = require('../controllers/auth/SinginController');
const CategoriesController = require('../controllers/CategoryController');
const TransanctionController = require('../controllers/TransactionController');
const UserController = require('../controllers/UserController');

const APIROUTER = express.Router();


//auth
APIROUTER.post('/sign-up', SignUpController.registerUser);
APIROUTER.post('/sign-in', SignInController.signIn);
APIROUTER.get('/users/current/:id', UserController.getCurrentUser);

//category
APIROUTER.post('/categories', CategoriesController.addNewCategory);
APIROUTER.get('/categories/expense', CategoriesController.getExpenseCategories);
APIROUTER.get('/categories/income', CategoriesController.getIncomeCategories);
APIROUTER.get('/categories/:id', CategoriesController.getSingleCategory);
APIROUTER.get('/categories/users/:userId', CategoriesController.getUserCategories);
APIROUTER.put('/categories/:id', CategoriesController.updateCategory);
APIROUTER.delete('/categories/:id', CategoriesController.deleteCategory);

// Transaction
APIROUTER.post('/transactions', TransanctionController.newTransaction);
APIROUTER.get('/transactions/users/:creator', TransanctionController.getMyTransactions);
APIROUTER.get('/transactions/users/:creator/expenses', TransanctionController.getExpenseTransactions);
APIROUTER.get('/transactions/users/:creator/incomes', TransanctionController.getIncomeTransactions);
APIROUTER.get('/transactions/:id', TransanctionController.getTransaction);
APIROUTER.get('/transactions/:id', TransanctionController.getTransaction);
APIROUTER.put('/transactions/:id', TransanctionController.updateTransaction);
APIROUTER.delete('/transactions/:id', TransanctionController.deleteTransaction);

module.exports = APIROUTER;