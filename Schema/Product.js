const mongoose = require('mongoose') ;
const { Schema } = mongoose;
const ProductSchema = new Schema(
    {
  name: {
    type: String
  },
  Price: {
    type: Number,
    required: true,
    
  },
  discount_Price: {
    type: Number,
    required: false,
  
  },
  desc:{
    type: String,
    required: true,
    min: 10,
    max: 100
  },

  img: [
    {
      url:String,
    }
  ],
Quantity: {
    type: Number,
},
Variety: {
    color:{
        type: String,

    },
    size:{
type: Number,
    },
    gender:{

    },

},
Category: {
    type: String,
    required: true,
},
Brand: {
    type: String,
    require: false,
},
Comment: {
   text:{
    type: String,
   },
   User:{
    type: mongoose.Schema.Types.ObjectId, ref:"User",
   },
},
Rating: {
    Stars:{
        type: Number,
    },
    User:{
        type: mongoose.Schema.Types.ObjectId, ref:"User",
    },
},

  
  
  
  
  },
  {
    timestamps: true,
  }
 
);
// module.exports =mongoose.model
// ("User", UserSchema);



module.exports = mongoose.model("Product", ProductSchema);