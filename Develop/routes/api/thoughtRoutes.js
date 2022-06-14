const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController')

// GET all thoughts, POST create new thought
router.route('/').get(getThoughts).post(createThought);

// GET single thought by _id, PUT update thought, DELETE to delete thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// POST route to add reaction to thought, DELETE route to remove reaction
router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;