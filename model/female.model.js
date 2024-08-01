const mongoose = require('mongoose');

const femaleSchema = mongoose.Schema({
    name: {type: String,required: true},
    product: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'  }]
  },{
    versionKey: false
});
  
const FemaleModel = mongoose.model('Female', femaleSchema);

module.exports = FemaleModel;