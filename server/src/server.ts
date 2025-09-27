import app from "./app";
import mongoose from "mongoose";

const port = 5000;
const mongo_uri = process.env.MONGO_URI as string;

// Establish database connection
const startServer = async () => {
  try {
    await mongoose.connect(mongo_uri as string);

    // Start Express server
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error on server:", error);
  }
};

startServer();
