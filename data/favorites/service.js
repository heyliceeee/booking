//vai devolver sempre as ações q podemos fazer na BD

function FavoriteService(FavoriteModel) {
    let service = {
        create,
        findByUserId,
        removeById
    };

    //criar favorite
    function create(values, id) {

        let newFavorite = FavoriteModel(values, id);

        return save(newFavorite);
    }


    //guardar favorite
    function save(newFavorite) {
        return new Promise(function (resolve, reject) {

            //guardar
            newFavorite.save(function (err) {

                if (err) reject(err);

                resolve('Favorite created!');
            });
        });
    }


    //procurar favorite por user id
    function findByUserId(idUser, pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {

            FavoriteModel.find({ idUser: idUser }, {}, { skip, limit }, function (err, user) {

                if (err) reject(err);

                resolve(user);
            })
        })

            .then(async (users) => {

                const totalUsers = await FavoriteModel.count();

                return Promise.resolve({
                    favorites: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }


    //remover favorite pelo id
    function removeById(id) {
        return new Promise(function (resolve, reject) {

            console.log(id);

            FavoriteModel.findByIdAndRemove(id, function (err) {

                if (err) reject(err);

                console.log(err);
                resolve();
            });
        });

    }


    return service;
}

module.exports = FavoriteService;