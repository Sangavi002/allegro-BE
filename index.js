const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./config/db");
const userRouter = require("./route/user.route")
const collectionRouter = require("./route/collection.route")
const femaleRouter = require("./route/female.route")
const cartRouter = require("./route/cart.route")
const checkoutRouter = require("./route/checkout.route")

const cors = require("cors")

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors())

app.use("/user",userRouter)
app.use("/api",collectionRouter)
app.use("/female",femaleRouter)
app.use("/cart",cartRouter)
app.use("/checkout",checkoutRouter)

app.get("/",(req,res) => {
    res.status(200).send({"msg": "Health check"})
})

app.listen(port,async() => {
    try{
        await connection;
        console.log(`Server is running on port ${port} and db is connected`)
    }catch(err){
        console.log(err.msg)
    }
})
