import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(postRoutes);
app.use(userRoutes);
app.use(express.static("uploads"))



dns.setServers(["8.8.8.8", "1.1.1.1"]);

const start = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            ssl: true,
            tls: true,
        });
        
    app.listen(9090,() =>{
        console.log("Server is listing on port 9090");
    });
    }catch(error){
        console.log("MongoDB connction failed.", error.message);
        process.exit(1);
    }
};
start();
