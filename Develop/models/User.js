const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
          validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: "Please enter a valid email"
      },
      required: [true, "Email required"]
    }, 
    thoughts: {
      type: [{ type: Schema.Types.ObjectId, ref: 'thought' }]
    },
    friends: {
      type: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual('friendcount').get(function() {
  let count = 0
  for (let i = 0; i < this.friends.length; i++) {
    count = count + 1
  }
  return count
})

const User = model('user', userSchema);

module.exports = User;
