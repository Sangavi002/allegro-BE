const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 }
    }]
}, {
    versionKey: false
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
