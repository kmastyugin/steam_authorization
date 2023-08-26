require('dotenv').config();
import {http, mongoose} from "@modules";

const start = async () => {
  await mongoose.connect(process.env.MONGO_KEY + process.env.MONGO_DB);
  await http.listen(process.env.PORT);
}

start();