//vai devolver sempre as ações q podemos fazer na BD

function RoomService(RoomModel){
    let service = {
        create,
        findAll,
        findById,
        update,
        removeById
    };


    //criar room
    function create(values){
        console.log("teste")
        let newRoom = RoomModel(values);
        return save(newRoom); //guarda novo room
    }

    //guardar room
    function save(newRoom){
        return new Promise(function (resolve, reject) {

            //guardar
            newRoom.save(function (err) {
                if(err) reject(err);

                resolve('Room created!');
            });
        });
    }

    //procurar room
    function findAll(){
        return new Promise(function (resolve, reject){

            RoomModel.find({}, function (err, users) {
                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            });
        });
    }

    //procurar room por id
    function findById(id){
        return new Promise(function (resolve, reject) {
            RoomModel.findById(id, function (err, user) {
                if(err) reject(err);

                //objecto de todos os users
                resolve(user);
            });
        });
    }

    //atualizar room
    function update(id, values){
        return new Promise(function (resolve, reject) {

            //values - {description: quarto com vista mar} || {nAdult: 2} ... || {description: j, nAdult: 0} ...
            RoomModel.findByIdAndUpdate(id, values, function (err, user) {
                if(err) reject(err);

                resolve(user);
            });
        });
    }

    //remover room pelo id
    function removeById(id) {
        return new Promise(function (resolve, reject) {

            console.log(id);

            RoomModel.findByIdAndRemove(id, function(err) {

                
                if(err) reject(err);
                console.log(err);
                resolve();
            });
        });
    }

    return service;
}

module.exports = RoomService;