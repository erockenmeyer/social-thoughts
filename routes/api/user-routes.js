const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    deleteFriend,
    deleteUser
} = require('../../controllers/user-controller');

// get all & post at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// get one, update, delete at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// add or delete a friend
router
    .route(':userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;