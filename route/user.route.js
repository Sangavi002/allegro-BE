const express = require("express");
const UserModel = require("../model/user.model")
const userRouter = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth.middleware")
const ProductModel = require("../model/product.model")
const BlackListedTokenModel = require("../model/blacklisted.model")

userRouter.post("/register", async (req, res) => {
    const { email, password,contact } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ "msg": "Email already exists." });
        }
        bcryptjs.hash(password, 10, async (err, hash) => {
            if (err) {
                res.status(500).send({ "msg": "Something went wrong." });
            } else {
                const user = new UserModel({ email, password: hash, contact });
                await user.save();
                res.status(200).send({ "msg": "Successfully Registered." });
            }
        })
    } catch (err) {
        res.status(500).send({ "msg": "Failed to register." });
    }
});


userRouter.post("/login",async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcryptjs.compare(password,user.password,async(err,result) => {
                if(err){
                    res.status(500).send({"msg": "Something went wrong."});
                }if(result){
                    let token = jwt.sign({id: user._id},process.env.JWT_SECRET)
                    res.status(200).send({"msg":"Logged In successfully.","Token": token,"UserId":user._id});
                }else{
                    res.status(404).send({"msg": "Wrong paswword."});
                }
            })
        }else{
            res.status(404).send({"msg": "Wrong crendentails."})
        }
    }catch(err){
        res.status(404).send({"msg": "Error in login."});
    }
})

userRouter.post("/product", async (req, res) => {
    try {
        const { title,price,image,delivery} = req.body;
        const newProduct = new ProductModel({ title, price, image, delivery});
        await newProduct.save();
        res.status(200).send({"msg":"New product is added."});
    } catch (error) {
        console.log(error)
        res.status(404).send({"msg":"Fail to add new product."});
    }
});

userRouter.get("/logout", auth,async(req,res) => {
    try {
        let token = req.headers.authorization?.split(' ')[1];
        
        await BlackListedTokenModel.create({ token });
        res.status(200).send({ "msg": "Logged out successfully" });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error" });
    }
});


module.exports = userRouter