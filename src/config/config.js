
import dotenv from "dotenv";

dotenv.config()

export default {
    connectionString: process.env.MONGO_URL,
    PORT: process.env.PORT
}
