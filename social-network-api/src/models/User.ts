import { Schema, model, Document } from 'mongoose';
import Thought from './Thought';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: typeof Thought[];
    friends: IUser[];
    friendCount: number;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

UserSchema.virtual('friendCount').get(function (this: IUser) {
    return this.friends.length;
});

const User = model<IUser>('User', UserSchema);

export default User;