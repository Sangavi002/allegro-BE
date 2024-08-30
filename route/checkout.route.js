const express= require("express");
const CheckoutModel = require("../model/checkout.model");
const CartModel = require("../model/cart.model")
const auth = require("../middleware/auth.middleware")

const checkoutRouter = express.Router()

checkoutRouter.post("/list",auth, async (req, res) => {
    const { userId,customer_detail } = req.body;
    
    if (!userId) {
        return res.status(400).send("Invalid request data.");
    }

    try {
        let user = await CartModel.findOne({ userId});
        let checkout = await CheckoutModel.findOne({ userId});
        if (!checkout) {
            checkout = new CheckoutModel({ userId, order_item:user.products, customer_detail});
        }
        await checkout.save();

        res.status(200).send(checkout);
    } catch (err) {
        console.log(err);
        res.status(500).send({ "msg": "Failed to Checkout." });
    }
});

module.exports=checkoutRouter
