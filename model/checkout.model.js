const mongoose = require('mongoose');

const checkoutSchema = mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order_item: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'  }],
    customer_detail:[{
        firstname:{type: String, require: true},
        lastname:{type: String, require: true},
        mobile:{type: Number, require: true},
        country:{type: String, require: true},
        street:{type: String, require: true},
        buildingNo:{type: Number, require: true},
        apartmentNo:{type: Number, require: true},
        postalCode:{type: Number, require: true},
        city:{type: String, require: true}
    }]
},{
    versionKey: false
});

const CheckoutModel = mongoose.model('Checkout', checkoutSchema);

module.exports = CheckoutModel;
