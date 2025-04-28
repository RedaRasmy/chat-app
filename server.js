import { createServer } from "node:http"
import next from "next"
import { Server } from "socket.io"

const dev = process.env.NODE_ENV !== "production"
// const hostname = "localhost"
const port = process.env.PORT || 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
    const httpServer = createServer(handler)

    const io = new Server(httpServer)

    io.on("connection", (socket) => {

        socket.on('register', ({userId}) => {
            socket.join(userId)
            // room for each user : for multi-device feature
        })

        socket.on("see", async ({recipientId, chatId}) => {
            io.to(recipientId).emit('see' , chatId)
        });

        socket.on('delivery' , ({recipientId,chatId}) => {
            io.to(recipientId).emit('delivery' , chatId )
        })
    
        socket.on("message", async ({recipientId,message}) => {
            // console.log('received message:',message)
            // console.log('to :',recipientId)
            io.to(recipientId).emit('message' , message)
            // callback({status:'ok'})
        });

        socket.on("typing", async ({recipientId,chatId}) => {
            io.to(recipientId).emit('typing',chatId)
        });

        
        socket.on("disconnect", () => {
            // console.log(`User ${socket.id} disconnected`);
        });
    })

    httpServer
        .once("error", (err) => {
            console.error(err)
            process.exit(1)
        })
        .listen(port, () => {
            console.log(`lisen on port : ${port}`)
        })
})


