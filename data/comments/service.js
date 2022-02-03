//vai devolver sempre as ações q podemos fazer na BD

function CommentService(CommentModel) {
    let service = {
        create,
        findByRoomId
    };

    //criar comment
    function create(values, id) {

        let newComment = CommentModel(values, id);

        return save(newComment);
    }


    //guardar comment
    function save(newComment) {
        return new Promise(function (resolve, reject) {

            //guardar
            newComment.save(function (err) {

                if (err) reject(err);

                resolve('Comment created!');
            });
        });
    }


    //procurar comment por room id
    function findByRoomId(idRoom, pagination) {

        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {

            CommentModel.find({ idRoom: idRoom }, {}, { skip, limit }, function (err, user) {

                if (err) reject(err);

                resolve(user);
            })
                .sort('date')
        })

            .then(async (users) => {

                const totalUsers = await CommentModel.count();

                return Promise.resolve({
                    comments: users,
                    pagination: {
                        pageSize: limit,
                        page: Math.floor(skip / limit),
                        hasMore: (skip + limit) < totalUsers,
                        total: totalUsers
                    }
                });
            });
    }

    return service;
}

module.exports = CommentService;