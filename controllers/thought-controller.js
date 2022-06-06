const { User, Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get a thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                // if no data, 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a new thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                // if no data, 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with that id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                // if no data, 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { replies: body } },
            { new: true }
        )
            .then(dbThoughtData => {
                // if no data, 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete a thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(dbThoughtData => {
                // if no data, 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that id!' });
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                // if no data, 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought with that id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.thoughtId },
            { $pull: { replies: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => {
                // if no data, 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
}

module.exports = thoughtController;