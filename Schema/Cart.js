const mongoose = require("mongoose");
const{Schema} = mongoose;

const CartSchema = new Schema(
{
    cartItems: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        },
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

},
{
  timestamps: true,  
}

);
module.exports = mongoose.model("Cart", CartSchema);