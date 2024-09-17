const express = require("express");
const CartModel = require("../model/cart.model");
const auth = require("../middleware/auth.middleware");

const cartRouter = express.Router();

cartRouter.post("/cartItem", auth, async (req, res) => {
    const { userId, products } = req.body;

    if (!userId || !products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).send("Invalid request data.");
    }

    try {
        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            cart = new CartModel({ userId, products: [] });
        }

        products.forEach(newProduct => {
            const existingProductIndex = cart.products.findIndex(product =>
                product.product.toString() === newProduct.product &&
                product.size === newProduct.size
            );

            if (existingProductIndex >= 0) {
                cart.products[existingProductIndex].quantity += newProduct.quantity;
            } else {
                cart.products.push(newProduct);
            }
        });

        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

cartRouter.get("/cartItems", auth, async (req, res) => {
    const userId = req.query.id;

    if (!userId) {
        return res.status(400).send("Invalid user ID.");
    }

    try {
        const cart = await CartModel.findOne({ userId }).populate('products.product');
        if (!cart) {
            return res.status(404).send("Cart not found.");
        }

        const cartWithoutId = cart.toObject();
        cartWithoutId.products = cartWithoutId.products.map(({ _id, ...rest }) => rest);

        res.status(200).send(cartWithoutId);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

cartRouter.put('/cartItems', auth, async (req, res) => {
    const { userId, productId, quantity } = req.query;

    if (!userId || !productId || !quantity) {
        return res.status(400).send("Invalid user ID, product ID, or quantity.");
    }

    try {
       
        const cart = await CartModel.findOne({ userId });
        console.log(cart)
        if (!cart) {
            return res.status(404).send("Cart not found.");
        }

        const product = cart.products.find(p => p.product.toString() === productId);
        console.log(product)
        if (product) {
            product.quantity = Number(quantity);
            await cart.save();
            return res.status(200).send("Update the product quantity");
        } else {
            return res.status(404).send("Product not found in the cart.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



cartRouter.delete('/cartItems', auth, async (req, res) => {
    const { userId, productId } = req.query;
    if (!userId || !productId) {
        return res.status(400).send("Invalid user ID or product ID.");
    }
    try {
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).send("Cart not found.");
        }
        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


module.exports = cartRouter;


