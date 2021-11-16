function UserService(UserModel) {
    let service = {
        create,
        createToken,
        findAll
    };

    

    function create(values) {
        let newUser = UserModel(values);
        return save(newUser);
    }

    function save(newUser) {
        return new Promise(function (resolve, reject) {
            //do a thing, possibly async, then...
            newUser.save(function (err) {
                console.log(err);
                if (err) reject("There's a problema with register");

                resolve('Player Created!')
            });
        });
    }

    function createToken(user) { 
        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: config.expiresPassword
        });
    
        return {auth: true, token}
    }

    function findAll(){
        return new Promise(function (resolve, reject){

            UserModel.find({}, function (err, users) {
                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            });
        });
    }

    return service;
}

module.exports = UserService;