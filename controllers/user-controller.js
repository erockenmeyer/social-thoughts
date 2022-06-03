const User = require('../models');

const UserController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate(
                {
                    path: 'thoughts',
                    select: '-__v'
                },
                {
                    path: 'friends',
                    select: 'username, _id'
                }
            )
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get single user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate(
                {
                    path: 'thoughts',
                    select: '-__v'
                },
                {
                    path: 'friends',
                    select: 'username, id'
                }
            )
            .select('-__v')
            .then(dbUserData => {
                // if no user found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
}