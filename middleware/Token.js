const Users = require('../data/users');

module.exports = (req, res, next) => {

    console.log(req.cookies);
    let token = req.cookies.token;

    if (!token) {
        return res.status(401).send({ auth: false, message: 'no token provided.' })
    }


    Users.verifyToken(token)
        .then((decoded) => {
            req.roleUser = decoded.role;
            req.id = decoded.id;
            req.nameRole = decoded.nameRole;
            req.name = decoded.name;
            next();
        })

        .catch(() => {
            res.status(401).send({ auth: false, message: 'not authorized' })
        })
};