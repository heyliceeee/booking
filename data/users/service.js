const config = require("../../config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function UserService(UserModel){
    let service = {
        create,
        save,
        createToken,
        verifyToken,
        findUser,
        createPassword,
        comparePassword,
        checkRole,
    };


    //criar user
    function create(user, role){
        return createPassword(user, role)
            .then((hashPassword, err) => {
                if(err){
                    return Promise.reject("Not saved");
                }

                let newUserWithPassword = {
                    ...user,
                    password: hashPassword,
                    role
                }

                let newUser = UserModel(newUserWithPassword);

                //console.log(newUser);

                return save(newUser); //guarda novo user
            });
    }


    //guardar user
    function save(newUser){
        return new Promise(function (resolve, reject){

            //guardar
            newUser.save(function (err) {

                if (err) reject("There is a problem with register");
                resolve("user created");
            });
        });
    }


    //criar token
    function createToken(user){
        
        let token = jwt.sign({ id: user._id, }, config.secret, {
            expiresIn: config.expiresPassword 
        });

        return { auth: true, token }
    }


    //verificar token
    function verifyToken(token){
        return new Promise((resolve, reject) => {
            
            jwt.verify(token, config.secret, (err, decoded) => {

                if(err){

                    reject();
                }

                return resolve(decoded);
            })
        })
    }


    //procurar user pelo nome
    function findUser({ name, password, role }) {
        return new Promise(function (resolve, reject) {

            UserModel.findOne({ name, role }, function (err, user) {
                if(err) reject(err);
                //objeto de todos os users

                if(!user){
                    reject("This data is wrong");
                }

                resolve(user);
            });
        })
        .then((user) => {
            return comparePassword(password, user.password)
                .then((match) => {
                    
                    if(!match) return Promise.reject("User not valid");

                    return Promise.resolve(user);
                })
        })
    }


    //criar password encriptada
    function createPassword(user){
        return bcrypt.hash(user.password, config.saltRounds);
    }


    //comparar password encriptada com a original (???)
    function comparePassword(password, hash){
        return bcrypt.compare(password, hash);
    }


    //verificar role
    function checkRole(role, req, res, next) {

        if(role.includes(user.role)){
            next();
        }

        return res.status(401);
    }


    return service;
}

module.exports = UserService;