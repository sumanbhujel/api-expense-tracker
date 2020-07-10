
const User = require('../models/User');

class UserController {

    async getCurrentUser(request,response) {
        let userId = request.params.id;
        let user = await User.findById(userId);
        if (!user) {
            response.status(404).json({ success: false, message: "User does not exist!" });
        } else {
            response.status(200).json({ success: true, user: user });
        }
    }

    async addIncome(owner, income) {
        try {
            await User.findOneAndUpdate({ _id: owner }, { $inc: { totalIncome: income } }, { new: true });
        } catch (error) {
            console.log(error);
        }
    }

    async addExpense(owner, expense) {
        try {
            await User.findOneAndUpdate({ _id: owner }, { $inc: { totalExpense: expense } }, { new: true });
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new UserController();