const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    /*
     * Check if authorization header is set
     */
    if(req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {
            /*
             * Try to decode & verify the JWT token
             * The token contains user's id ( it can contain more informations )
             * and this is saved in req.user object
             */
            req.userAuthenticated = jwt.verify(req.headers['authorization'], config.secret);
        } catch(err) {
            /*
             * If the authorization header is corrupted, it throws exception
             * So return 401 status code with JSON error message
             */
            return res.status(401).json({
                message: 'Failed to authenticate token!'
            });
        }
    } else {
        /*
         * If there is no autorization header, return 401 status code with JSON
         * error message
         */
        return res.status(401).json({
            message: 'No token!'
        });
    }
    next();
}
