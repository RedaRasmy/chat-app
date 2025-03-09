
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {io} from 'socket.io-client'

export const socket = io('ws://localhost:3500',{
    // auth : {
    //     token : getKindeServerSession().getAccessToken
    // }
})