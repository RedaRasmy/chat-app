'use client'
import { io }  from 'socket.io-client';
import { useState } from "react";

export default function Home() {
    const socket = io('ws://localhost:3500');
    const [message,setMessage] = useState('');
    const [receivedMessages,setReceivedMessages] = useState<string[]>([]);

    socket.on("message",(data)=>{
        setReceivedMessages([...receivedMessages,data])
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
        if (!message) return;
        socket.emit('message',message);
    }

    return (
        <div className="flex justify-between">
            <form action="" onSubmit={handleSubmit}>
              <input 
              className="m-10 bg-slate-600 px-3 py-2 text-black border-[4px] outline-none rounded-md shadow-md border-teal-950"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text" />
              <button className="border-2 border-blue-500 p-2 rounded-xl">
                send
              </button>
            </form>
            <div className="m-10">
              <h1>Received Messages</h1>
              {receivedMessages.map(message=>(
                <p key={message} >{message}</p>
              ))}
            </div>
        </div>
    );
}
