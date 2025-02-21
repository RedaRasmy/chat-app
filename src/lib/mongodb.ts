import mongoose from 'mongoose';
import parsedEnv from '../../env';


export default async function connectMongoDB() {
    try {
        await mongoose.connect(parsedEnv.MONGODB_URI)
        console.log('connected to mongodb successfuly')
    } catch (err) {
        console.log(err)
    }
}