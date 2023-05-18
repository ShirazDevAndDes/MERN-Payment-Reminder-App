const express = require("express");
const routes = require("./router/routes");
const cors = require("cors");
const app = express();

app.use(cors());
app.listen(3001, console.log("Server Started"));
app.use(express.json());
app.use("/api", routes);
