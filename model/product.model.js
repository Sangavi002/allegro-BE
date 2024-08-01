const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: {type: String,required: true},
  price:  {type: Number,required: true},
  image: {type: String,required: true},
  delivery:  {type: String,required: true},
},{
    versionKey: false
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports=ProductModel

