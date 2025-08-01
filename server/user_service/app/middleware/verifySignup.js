const db = require('../models/models');
const User = db.user;

const checkDuplicate = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            nom: req.body.nom
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }

        // Password
        User.findOne({
            where: {
                password_user: req.body.password_user
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! password_user is already in use!"
                });
                return;
            }
            next();
        });
        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            next();
        });
    });
    
}
module.exports = {
    checkDuplicate
};