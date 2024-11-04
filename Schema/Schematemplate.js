const mongoose = require("mongoose");
const{Schema} = mongoose;

const UserSchema = new Schema(
{

},
{
  timestamps: true,  
}

);
module.exports = mongoose.model("User", UserSchema);