const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController')


// GET all users, POST create user
router.route('/').get(getUsers).post(createUser);

// GET single user by id including thoughts + friend list, PUT update user, DELETE remove user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// POST route to add friend to users friend list, DELETE route to remove friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);



module.exports = router;