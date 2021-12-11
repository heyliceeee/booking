module.exports = {
    //USER
    'read-own-reserves': 'read-own-reserves',
    'update-own-reserve': 'update-own-reserve',

    //EDITOR


    //ADMIN
    'read-users': 'read-users',

    //ADMIN EDITOR
    'update-reserve': 'update-reserve',
    'read-reserves': 'read-reserves',
    'delete-reserve': 'delete-reserve',
    'create-room': 'create-room',
    'update-room': 'update-room',
    'read-reserve-client': 'read-reserve-client',

    //ADMIN EDITOR USER
    'create-reserve': 'create-reserve',
    'detail-reserve': 'detail-reserve',
    'verify-logged-in': 'verify-logged-in'
};


/* 
GET /hotel/rooms -> SEM SCOPE
GET /hotel/rooms/:roomId -> SEM SCOPE
GET /hotel/rooms/:roomId/tags -> SEM SCOPE
GET /hotel/rooms/:description -> SEM SCOPE
GET /reserve/user/reserves/:userId -> 'read-own-reserves'
POST /reserve/reserves/:roomId -> 'create-reserve'
PUT /reserve/user/reserves/:reserveId -> 'update-own-reserve'
PUT /reserve/reserves/:reserveId -> 'update-reserve'
GET /reserve/reserves -> 'read-reserves'
GET /reserve/reserves/:reserveId -> 'detail-reserve'
DELETE /reserve/reserves/:reserveId -> 'delete-reserve'
POST /hotel/rooms -> 'create-room'
PUT /hotel/rooms/:roomId -> 'update-room'
GET /reserve/reserves/:userId -> 'read-reserve-client'
GET /auth/admin/users -> 'read-users'
GET /auth/me -> 'verify-logged-in'


/auth/user/login *
/auth/user/register *

/auth/editor/login *
/auth/editor/register *

/auth/admin/login *
/auth/admin/register *
*/