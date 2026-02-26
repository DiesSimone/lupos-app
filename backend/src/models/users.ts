import mongoose from 'mongoose';

interface IUser {
    username: string,
    email: string,
    password: string,
    created_at: Date
}

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: false
        },
        created_at: {
            type: Date,
            required: true,
            unique: false
        }
    }
);

const user = mongoose.model("User", userSchema);

export default user;