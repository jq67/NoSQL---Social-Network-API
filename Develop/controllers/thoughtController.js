const { User, Thought } = require('../models');

module.exports = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
          .then(async (thoughts) => {
            const thoughtObj = {
              thoughts,
            //   headCount: await headCount(),
            };
            return res.json(thoughtObj);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    
    // GET single thought by _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then(async (thought) =>
            !thought
              ? res.status(404).json({ message: 'No thoughts with that ID' })
              : res.json({
                  thought
                //   grade: await grade(req.params.studentId),
                })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    // POST a new thought to a user
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => 
          User.findOneAndUpdate(
              { username: thought.username },
              { $addToSet: { thoughts: thought._id } },
              { runValidators: true, new: true }
          )
            .then((user) =>
            res.json(user)
            )
          )
          .catch((err) => res.status(500).json(err));
    },


    // PUT route to update thought by _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            res.status(400).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },


    // DELETE thought by _id
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No such thought exists' })
              : User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true },
              )
                .then((user) =>
                res.json(user))
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    // POST route to add reaction to thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true, },
            )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found' })
                : res.json({ thought }))
    },

    // DELETE route to remove reaction by reactionId value
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true, },
            )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found' })
                : res.json({ thought }))
    },
}