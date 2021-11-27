//vai devolver sempre as ações q podemos fazer na BD

function ReserveService(ReserveModel){
    let service = {
        create,
        findAll,
        findById,
        removeById,
        findByName
    };

    //criar reserve
    function create(values){

        let newReserve = ReserveModel(values);

        return save(newReserve);
    }


    //guardar reserve
    function save(newReserve){
        return new Promise(function (resolve, reject){

            //guardar
            newReserve.save(function (err){
                
                if(err) reject(err);

                resolve('Reserve created!');
            });
        });
    }


    //procurar reserve
    function findAll(){
        return new Promise(function (resolve, reject){

            ReserveModel.find({}, function (err, users){

                if(err) reject(err);

                //objecto de todos os users
                resolve(users);
            });
        });
    }


    //procurar reserve por id
    function findById(id){
        return new Promise(function (resolve, reject){

            ReserveModel.findById(id, function (err, user){

                if(err) reject(err);

                resolve(user);
            });
        });
    }


    //procurar reserve por name
    function findByName(name){
        return new Promise(function (resolve, reject){

            ReserveModel.find({name: new RegExp(name)}, function (err, users){

                if(err) reject(err);

                resolve(users);
            });
        });
    }


    //remover room pelo id
    function removeById(id){
        return new Promise(function (resolve, reject){

            console.log(id);

            ReserveModel.findByIdAndRemove(id, function (err){

                if(err) reject(err);

                console.log(err);
                resolve();
            });
        });

    }

    return service;
}

module.exports = ReserveService;