import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    participants : {

    },
    admins :{},
    messages: {} ,
}, {timestamps: true});

const Chat = mongoose.models.Chat || mongoose.model('User', ChatSchema);

export default Chat;

