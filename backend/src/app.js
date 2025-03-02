import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from "http";
import { initSocket } from "./utils/socketHandler.js";

const app = express()
const server = http.createServer(app);



// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
}))
// app.use(cors())


app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import 

import userRouter from "./routes/user.routes.js"
import jobRouter from "./routes/jobs.routes.js"
import applicationRouter from "./routes/application.routes.js"
import adminRouter from "./routes/admin.routes.js"
import chatbotRouter from "./routes/chatbot.routes.js"
import paymentRouter from "./routes/payment.routes.js"
import chatRouter from "./routes/chat.routes.js"

// routes declaration 

app.use("/v1/users",userRouter)
app.use("/v1/jobs",jobRouter)
app.use("/v1/application",applicationRouter)
app.use("/v1/admin",adminRouter)
app.use("/v1/chatbot",chatbotRouter)
app.use("/v1/payment",paymentRouter)
app.use("/v1/chat",chatRouter)

initSocket(server);
server.listen(process.env.PORT, () => {
    console.log(`🚀 Chat server running on port ${process.env.PORT}`);
  });

export { app }