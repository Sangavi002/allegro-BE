const express = require("express");
const CollectionModel = require("../model/collection.model");
const ProductModel = require("../model/product.model");

const collectionRouter = express.Router();

collectionRouter.post('/collection', async (req, res) => {
    try {
        const { name, product } = req.body;
        const collection = new CollectionModel({ name, product });
        await collection.save();
        res.status(200).send({ "msg": `New collection ${collection.name} created successfully.` });
    } catch (err) {
        console.error(err);
        res.status(404).send({ "msg": "Failed to create collection." });
    }
});

// collectionRouter.get('/collection/:id', async (req, res) => {
//     try {
//         const collection = await CollectionModel.findById(req.params.id).populate('product');
//         console.log(collection)
//         if (!collection) {
//             return res.status(404).send({ "msg": "Collection not found" });
//         }
//         res.status(200).send(collection);
//     } catch (err) {
//         console.error(err);
//         res.status(404).send({ "msg": "Failed to retrieve collection."});
//     }
// });

collectionRouter.get('/collections', async (req, res) => {
    try {
        const { id } = req.query;
        let query = {};

        const collections = await CollectionModel.find(query)
            .populate('product') 
            .exec();  

        if (collections) {
            if (id) {
                let foundProduct = null;
                collections.forEach(collection => {
                    const product = collection.product.find(product => product._id.toString() === id);
                    if (product) {
                        foundProduct = product;
                    }
                });

                if (foundProduct) {
                    return res.json(foundProduct); 
                } else {
                    return res.status(404).send('Product not found');
                }
            } else {
                return res.json(collections);
            }
        } else {
            return res.status(404).send('Collection not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


module.exports = collectionRouter;
