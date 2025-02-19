import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI ?? '')

const UserSchema = new mongoose.Schema({
    username : String,
    email: {
        type: String,
        immutable: true,
        unique: true,
        lowercase: true,
    },
    password : String,
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;