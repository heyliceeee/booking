//vai devolver sempre as ações q podemos fazer na BD

function RoomService(RoomModel){
    let service = {
        create
    };

    //criar room
    function create(values){
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

    return service;
}

module.exports = RoomService;
