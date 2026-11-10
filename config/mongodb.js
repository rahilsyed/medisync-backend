import dns from "node:dns";
import mongoose from "mongoose";

// Node's resolver on this machine points at 127.0.0.1, which refuses the SRV
// lookup that mongodb+srv:// URIs need. Use public DNS servers instead.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Connected"))
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
    } catch (error) {
        console.error("MongoDB connection failed:", error.message)
        process.exit(1)
    }
}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.
