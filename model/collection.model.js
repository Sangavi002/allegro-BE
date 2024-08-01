const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
    name: {type: String,required: true},
    product: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'  }]
  },{
    versionKey: false
});
  
const CollectionModel = mongoose.model('Collection', collectionSchema);

module.exports = CollectionModel;