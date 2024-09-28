import mongoose from "mongoose";

const connect = async () => {
    try {
        const connectDB = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${connectDB.connection.host}`);
    } catch (error) {
        console.log("🚀 ~ dbConfig ~ Something Went Wrong in connecting to DB");
        console.log("🚀 ~ dbConfig ~ error:", error);
        process.exit(1);
    }
};

export default connect;
