
const User = require('../../models/User');
const Validation = require('../../requests/Validation');

class SigninController {

    //sign the user in to the application
    async signIn(request, response) {

        const result = Validation.SIGNIN(request.body);

        if (result.error) {
            let error = result.error.details[0];
            response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } });
        } else {
            try {
                let user = await User.findOne({ email: result.value.email });
                if (!user) {
                    response.status(404).json({ success: false, error: { field: "email", message: "User does not exist!" } });
                } else {
                    if (await user.comparePassword(result.value.password)) {
                        response.status(200).json({ success: true, user: user });
                    } else {
                        response.status(401).json({ success: false, error: { field: "email", message: "Invalid login. Try again!" } });
                    }
                }
            } catch (error) {
                response.status(500).json({ success: false, error: error.message });
            }
        }
    }
}


module.exports = new SigninController();
