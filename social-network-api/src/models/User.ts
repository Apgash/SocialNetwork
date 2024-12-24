import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  thoughts: [
    {
      type: Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Virtual for friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

export default User;