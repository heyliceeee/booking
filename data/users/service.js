const config = require("../../config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function UserService(UserModel) {
    let service = {
        create,
        save,
        createToken,
        verifyToken,
        findUser,
        findAll,
        removeById,
        createPassword,
        comparePassword,
        autorize
    };


    //criar user
    function create(user) {
        return createPassword(user)
            .then((hashPassword, err) => {
                if (err) {
                    return Promise.reject("Not saved");
                }

                let newUserWithPassword = {
                    ...user,
                    password: hashPassword
                }

                let newUser = UserModel(newUserWithPassword);
                return save(newUser); //guarda novo user
            });
    }


    //guardar user
    function save(newUser) {
        return new Promise(function (resolve, reject) {

            //guardar
            newUser.save(function (err) {

                if (err) reject("There is a problem with register");
                console.log(err);
                resolve(newUser);
            });
        });
    }


    //criar token
    function createToken(user) {

        console.log(user);

        let token = jwt.sign({ id: user._id, role: user.role.scopes, name: user.name, nameRole: user.role.nameRole }, config.secret, {
            expiresIn: config.expiresPassword
        });

        return { auth: true, token }
    }


    //verificar token
    function verifyToken(token) {
        return new Promise((resolve, reject) => {

            jwt.verify(token, config.secret, (err, decoded) => {

                if (err) {

                    reject();
                }

                return resolve(decoded);
            })
        })
    }


    //procurar user pelo nome
    function findUser({ name, password, role }) {
        return new Promise(function (resolve, reject) {

            UserModel.findOne({ name }, function (err, user) {

                if (err) reject(err);
                //objeto de todos os users


                if (!user) {
                    reject("This data is wrong");
                }

                resolve(user);
            });
        })
            .then((user) => {
                return comparePassword(password, user.password)
                    .then((match) => {

                        if (!match) return Promise.reject("User not valid");

                        return Promise.resolve(user);
                    })
            })
    }


    //procurar users
    function findAll(pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {
            UserModel.find({}, {}, { skip, limit }, function (err, users) {

                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            });
        })

            .then(async (users) => {

                const totalUsers = await UserModel.count();

                return Promise.resolve({
                    users: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }

    //remover user pelo id
    function removeById(id) {
        return new Promise(function (resolve, reject) {

            console.log(id);

            UserModel.findByIdAndRemove(id, function (err) {

                if (err) reject(err);
                console.log(err);
                resolve();
            });
        });
    }


    //criar password encriptada
    function createPassword(user) {
        return bcrypt.hash(user.password, config.saltRounds);
    }


    //comparar password encriptada com a original (???)
    function comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }


    //autorizar se aquele scope pode ter acesso aquela route
    function autorize(scopes) {

        return (req, res, next) => {
            const { roleUser } = req;
            const hasAutorization = scopes.some(scope => roleUser.includes(scope));

            if (roleUser && hasAutorization) {
                next();

            } else {
                res.status(403).json({ message: 'forbidden' });
            }
        }
    }


    return service;
}

module.exports = UserService;