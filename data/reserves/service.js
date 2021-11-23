function ReserveService(ReserveModel){
    let service = {
        create,
        save
    };

    function create(values){
        let newReserve = ReserveModel(values);
        return save(newReserve); //guarda novo room
    }

    //guardar room
    function save(newReserve){
        return new Promise(function (resolve, reject) {

            //guardar
            newReserve.save(function (err) {
                if(err) reject(err);

                resolve('Reserve created!');
            });
        });
    }
    

    return service

}