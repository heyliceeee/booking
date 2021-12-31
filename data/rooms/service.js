//vai devolver sempre as ações q podemos fazer na BD

const Room = require("./room");

function RoomService(RoomModel) {
    let service = {
        create,
        findAll,
        findById,
        update,
        removeById,
        findByDescription,
        findAllHighPrice,
        findAllLowPrice,
        findAllMoreStars,
        findAllLessStars,
        findAllMostRecent
    };


    //criar room
    function create(values) {
        let newRoom = RoomModel(values);
        return save(newRoom); //guarda novo room
    }

    //guardar room
    function save(newRoom) {
        return new Promise(function (resolve, reject) {

            //guardar
            newRoom.save(function (err) {
                if (err) reject(err);

                resolve('Room created!');
            });
        });
    }

    //procurar room
    function findAll(pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {

            RoomModel.find({}, {}, { skip, limit }, function (err, users) {

                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            });
        })

            .then(async (users) => {

                const totalUsers = await RoomModel.count();

                return Promise.resolve({
                    rooms: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }

    //procurar room
    function findAllHighPrice(pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {

            RoomModel.find({}, {}, { skip, limit }, function (err, users) {

                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            })
                .sort({ 'price': -1 }); //ordenação crescente por price
        })

            .then(async (users) => {

                const totalUsers = await RoomModel.count();

                return Promise.resolve({
                    rooms: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }

    //procurar room
    function findAllLowPrice(pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {

            RoomModel.find({}, {}, { skip, limit }, function (err, users) {

                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            })
                .sort('price'); //ordenação crescente por price
        })

            .then(async (users) => {

                const totalUsers = await RoomModel.count();

                return Promise.resolve({
                    rooms: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }

    //procurar room
    function findAllMoreStars(pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {

            RoomModel.find({}, {}, { skip, limit }, function (err, users) {

                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            })
                .sort({ 'tags.nStars': -1 }); //ordenação crescente por price
        })

            .then(async (users) => {

                const totalUsers = await RoomModel.count();

                return Promise.resolve({
                    rooms: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }

    //procurar room
    function findAllLessStars(pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {

            RoomModel.find({}, {}, { skip, limit }, function (err, users) {

                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            })
                .sort({ 'tags.nStars': 1 }); //ordenação crescente por price
        })

            .then(async (users) => {

                const totalUsers = await RoomModel.count();

                return Promise.resolve({
                    rooms: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }

    //procurar room
    function findAllMostRecent(pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {

            RoomModel.find({}, {}, { skip, limit }, function (err, users) {

                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            })
                .sort({ '_id': -1 }); //ordenação crescente por price
        })

            .then(async (users) => {

                const totalUsers = await RoomModel.count();

                return Promise.resolve({
                    rooms: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }

    //procurar room por id
    function findById(id, pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {

            RoomModel.findById(id, {}, { skip, limit }, function (err, user) {

                if (err) reject(err);

                //objecto de todos os users
                resolve(user);
            });
        })

            .then(async (users) => {

                const totalUsers = await RoomModel.count();

                return Promise.resolve({
                    rooms: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }

    //procurar room por description (full search)
    function findByDescription(description, pageNumber, nPerPage) {
        return new Promise(function (resolve, reject) {

            let intPageNumber = parseInt(pageNumber);
            let intNPerPage = parseInt(nPerPage);

            console.log("page: " + intPageNumber);
            console.log("nPerPage: " + intNPerPage);

            RoomModel.find({ description: new RegExp(description) }, function (err, users) {
                if (err) reject(err);

                //objecto de todos os users
                resolve(users);
            })

                .sort('price') //ordenação crescente por price
                .skip(intPageNumber > 0 ? ((intPageNumber - 1) * intNPerPage) : 0)
                .limit(intNPerPage);
        })
    }

    //atualizar room
    function update(id, values) {
        return new Promise(function (resolve, reject) {

            //values - {description: quarto com vista mar} || {nAdult: 2} ... || {description: j, nAdult: 0} ...
            RoomModel.findByIdAndUpdate(id, values, function (err, user) {
                if (err) reject(err);

                resolve(user);
            });
        });
    }

    //remover room pelo id
    function removeById(id) {
        return new Promise(function (resolve, reject) {

            console.log(id);

            RoomModel.findByIdAndRemove(id, function (err) {


                if (err) reject(err);
                console.log(err);
                resolve();
            });
        });
    }

    return service;
}

module.exports = RoomService;