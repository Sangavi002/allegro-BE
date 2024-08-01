const express = require("express");
const FemaleModel = require("../model/female.model");
const ProductModel = require("../model/product.model");

const femaleRouter = express.Router();

femaleRouter.post('/product', async (req, res) => {
    try {
        const { name, product } = req.body;
        const collection = new FemaleModel({ name, product });
        await collection.save();
        res.status(200).send({ "msg": `New collection ${collection.name} created successfully.` });
    } catch (err) {
        res.status(404).send({ "msg": "Failed to create collection." });
    }
});


femaleRouter.get('/collections', async (req, res) => {
    try {
        const { category,id} = req.query;
        let query = {};
        if (category !== "Promoted offers") {
            query = { name: category }; 
        }
        else{
            query = { name: "Promoted offers"
                
             }; 
        }
        const collection = await FemaleModel.find(query)
            .populate('product')
            .exec();

        if (collection) {
            // If an id is provided, find the specific product within the collection
            if (id) {
                const product = collection[0].product.find(product => product._id.toString() === id);
                
                if (product) {
                    return res.json(product); 
                } else {
                    return res.status(404).send('Product not found');
                }
            } else {
                return res.json(collection);
            }
        } else {
            return res.status(404).send('Collection not found');
        }

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


module.exports = femaleRouter;
