'use strict';

module.exports = function(app) {
    const user = require('../controllers/userController');
    
    // user Routes
    app.route('/user')
        .post(user.create_a_user);
    
    app.route('/user/:userId')
        .get(user.read_a_user)
        
    app.route('/user/login')
        .post(user.login_a_user)
    
    app.route('/user/verify_login/:userId/:email')
        .get(user.check_if_user_is_logged_in)
}