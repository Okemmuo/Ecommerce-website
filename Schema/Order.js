const mongoose = require("mongoose");
const{Schema} = mongoose;

const OrderSchema = new Schema(
{
cartItems: [
    {
        productCart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
        },
    },
],
totalAmout:{
    type: String
},
delivery:{
    address:{
        type: String
    }
}
},
{
  timestamps: true,  
}

);
module.exports = mongoose.model("User", UserSchema);