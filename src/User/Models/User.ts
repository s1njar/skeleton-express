import mongoose, {Schema} from 'mongoose';

/**
 * @interface IUser
 */
export interface IUser extends mongoose.Document {
    email: string;
    password: string;
}

/**
 * @const UserSchema
 */
export const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);