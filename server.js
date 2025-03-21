import { createServer } from "node:http"
import next from "next"
import { Server } from "socket.io"

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
    const httpServer = createServer(handler)

    const io = new Server(httpServer)

    io.on("connection", (socket) => {
        console.log("connected");

        socket.on("send-see-chat", (chatId) => {
            socket.to(chatId).emit('receive-see-chat')
        });
    
        socket.on("join-chats", (chatsIds) => {
            chatsIds.forEach(chatId=> {
                socket.join(chatId)
            })
        });
    
        socket.on("send-message", async (message,callback) => {
            console.log("Received:", message);
            socket.to(message.chatId).emit("receive-message", message );
            callback({status:'ok'})
        });
    
        socket.on("send-typing", async (chatId) => {
            console.log("typing...");
            socket.to(chatId).emit('receive-typing',chatId)
        });
    })

    httpServer
        .once("error", (err) => {
            console.error(err)
            process.exit(1)
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`)
        })
})


// export type WSResponse = {
//     status: "ok" | "not ok";
// };

// export type WSCallback = (response: WSResponse) => void;