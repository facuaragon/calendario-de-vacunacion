import mongoose from "mongoose";

const startDb = async () => {
  let connection;
  const url = process.env.MONGODB_URI.toString();

  try {
    if (!connection) connection = await mongoose.connect(url);
    // console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error(error);
  }
};

export default startDb;
