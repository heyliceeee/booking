//vai devolver sempre as ações q podemos fazer na BD

function ReserveService(ReserveModel) {
    let service = {
        create,
        findAll,
        findById,
        findByUserId,
        update,
        removeById,
        findByName
    };

    //criar reserve
    function create(values, id) {

        let newReserve = ReserveModel(values, id);

        return save(newReserve);
    }


    //guardar reserve
    function save(newReserve) {
        return new Promise(function (resolve, reject) {

            //guardar
            newReserve.save(function (err) {

                if (err) reject(err);

                resolve('Reserve created!');
            });
        });
    }


    //procurar reserve
    function findAll(pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {

            ReserveModel.find({}, {}, { skip, limit }, function (err, users) {

                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            });
        })

            .then(async (users) => {
                const totalUsers = await ReserveModel.count();

                return Promise.resolve({
                    reserves: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }


    //procurar reserve por id
    function findById(id) {
        return new Promise(function (resolve, reject) {
            ReserveModel.findById(id, function (err, user) {
                if (err) reject(err);

                //objecto de todos os users
                resolve(user);
            });
        });
    }


    //procurar reserve por user id
    function findByUserId(idUser, pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {

            ReserveModel.find({ idUser: idUser }, {}, { skip, limit }, function (err, user) {

                if (err) reject(err);

                resolve(user);
            })
                .sort('dateCheckIn') //ordenação crescente por date Check In
            //.skip(intPageNumber > 0 ? ((intPageNumber - 1) * intNPerPage) : 0)
            //.limit(intNPerPage);
        })

            .then(async (users) => {

                const totalUsers = await ReserveModel.count();

                return Promise.resolve({
                    reserves: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }


    //procurar reserve por name
    function findByName(name) {
        return new Promise(function (resolve, reject) {

            ReserveModel.find({ name: new RegExp(name) }, function (err, users) {

                if (err) reject(err);

                resolve(users);
            });
        });
    }


    //atualizar reserve
    function update(roomId, values) {
        return new Promise(function (resolve, reject) {

            ReserveModel.findByIdAndUpdate(roomId, values, function (err, user) {

                if (err) reject(err);

                resolve(user);
            });
        });
    }


    //remover room pelo id
    function removeById(id) {
        return new Promise(function (resolve, reject) {

            console.log(id);

            ReserveModel.findByIdAndRemove(id, function (err) {

                if (err) reject(err);

                console.log(err);
                resolve();
            });
        });

    }

    return service;
}

module.exports = ReserveService;