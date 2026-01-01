import app from "./app.js";
import { dbConnect } from "./config/dbConnect.js";
const port = process.env.PORT || 3000;

dbConnect();

app.listen(port, () => {
  console.log("Server running on port 3000");
});
