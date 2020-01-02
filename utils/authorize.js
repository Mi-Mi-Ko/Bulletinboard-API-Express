const Model = require("../model");

async function authenticate(req, res) {    
    const token = await Model.Token.getByTokenString(req.headers.authorization);
    
    if (!token) {
        return res.json({error: {  status: 403, message: 'An access token that does not exist is being sent.' }});
    }
    const user = await Model.User.getByEmail(token.email);
    if (!user || user === null || user === undefined || Object.keys(user).length == 0) {
        return res.json({error: { status: 404, message: 'User not found.' }});
    }
    return user;
};

exports.adminRole = async function(req, res, next) {
    const user = await authenticate(req, res);    
    var userData = user[0];
    if (userData.type !== "0") {
        return res.json({error: { status: 401, message: 'Can not get access admin role.' }});
    } 

    return next();
};

exports.userRole = function(req, res, next) {
    authenticate(req, res);

    return next();
};

exports.noAuth = function(next) {
    return next();
}