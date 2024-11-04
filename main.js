const express = require("express");
const cors = require ("cors");
const color = require("colors");
const dotenv =require("dotenv").config()
const connectDB = require("./config/db");
// const contentRoutes=require("./routes/content")
const bodyparser = require("body-parser");
const UserRoutes= require("./routes/User")
const  productRoutes = require("./routes/Product")

const app = express();
    connectDB();
const PORT = process.env.Port; 
app.use(bodyparser.json());
// app.use("/User", require("./routes/User"))
app.use("/User", UserRoutes )
app.use("/Products", productRoutes)
app.listen(PORT, () => console.log(`server running on port ${PORT}`.green));
