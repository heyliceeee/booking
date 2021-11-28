const config = require("../../config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const mailgun = require("mailgun-js");
//const DOMAIN = 'sandboxce44548564ea43bfa2ae1e646dea13d2.mailgun.org';
//const mg = mailgun({ apiKey: '1a7b89ba1d00ce38708846a9b3b293a9-7dcc6512-a5c50fc1', domain: DOMAIN });

function UserService(UserModel){
    let service = {
        create,
        save,
        createToken,
        //createTokenResetPassword,
        verifyToken,
        findUser,
        findEmail,
        findAll,
        createPassword,
        comparePassword
    };


    //criar user
    function create(user){
        return createPassword(user)
            .then((hashPassword, err) => {
                if(err){
                    return Promise.reject("Not saved");
                }

                let newUserWithPassword = {
                    ...user,
                    password: hashPassword
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

        console.log(user);

        let token = jwt.sign({ id: user._id, role: user.role, name: user.name }, config.secret, {
            expiresIn: config.expiresPassword 
        });

        return { auth: true, token }
    }


    //criar token reset password
    /* function createTokenResetPassword(user){

        let token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.RESET_PASSWORD_KEY, config.secret, {
            expiresIn: config.expiresPassword 
        });

        const data = {
            from: 'noreply.tecourses@gmail.com',
            to: { email: user.email },
            subject: 'account reset password link',
            html: `
                <h2>please click on given link to reset your password</h2>
                <p>${process.env.CLIENT_URL}/auth/resetpassword/${token}</p>
            `
        };

        return user.updateOne( { resetLink: token }, function(err, success){

            if(err){
                console.log('reset password link error');
                return res.status(400);
            
            } else {

                mg.messages().send(data, function (err, body){

                    if(err){
                       return console.log(err);
                    }

                    return console.log("email has been sent, kindly follow instructions");
                });
            }
        })
    } */


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

        UserModel.findOne({ name }, function (err, user) {

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


    //procurar user pelo nome
    function findEmail({ email }) {
        return new Promise(function (resolve, reject) {

        UserModel.findOne({ email }, function (err, user) {

                if(err) reject(err);
                //objeto de todos os users

            
                if(!user){
                    reject("This data is wrong");
                }

                resolve(user);
            });
        })
    }


    //procurar users
    function findAll(){
        return new Promise(function (resolve, reject){

            UserModel.find({}, function (err, users) {
                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            })
            .sort('role') //ordenação crescente por role
            ;
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

    return service;
}

module.exports = UserService;