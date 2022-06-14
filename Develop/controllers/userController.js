const { User } = require('../models')

module.exports = {
    // GET all users
    getUsers(req, res) {
        User.find()
          .then(async (users) => {
            const userObj = {
              users
            //   headCount: await headCount(),
            };
            return res.json(userObj);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    // GET single user by id including thoughts + friend list
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then(async (user) =>
            !user
              ? res.status(404).json({ message: 'No student with that ID' })
              : res.json({
                  user,
                //   grade: await grade(req.params.studentId),
                })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    // POST a new user
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
    },

    // PUT route to update user by _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
            res.status(400).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },


    // DELETE user by _id
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No such user exists' })
              : res.json({ user })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },


    // POST route to add friend to users friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true, },
            )
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user found' })
                : res.json({ user }))
    },

    // DELETE route to delete friend to users friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true, },
            )
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user found' })
                : res.json({ user }))
    },

}