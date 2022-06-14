const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatdate
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

function formatdate(date) {
  return new Date(date).toLocaleString();
}

thoughtSchema.virtual('reactioncount').get(function() {
  let count = 0
  for (let i = 0; i < this.reactions.length; i++) {
    count = count + 1
  }
  return count
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
