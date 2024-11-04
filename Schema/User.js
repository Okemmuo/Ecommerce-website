const mongoose = require('mongoose') ;
const { Schema } = mongoose;
const bcrypt =require("bcrypt")
const UserSchema = new Schema(
    {
  name: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin:{
    type: Boolean,
    default:false
  },
  address:{
    street:{
        type: String
    },
    suite:{
        type: String
    },
    city:{
        type: String
    },
    zipcode:{
        type: String
    },
    geo:{
        lat:{
          type: String

        },
        lng:{
          type: String
        }
    },
  },
  phone:{
    type: Number

  },
  website: {
    type: String,
    default: "https://geogle.com"
  },
  company: {
    name: {
      type: String,
    },
    catchPhrase: {
      type: String,
    }
  },
  password:{
    type: String,
    required: true,
    min:6,
    max: 12,
    default: "1234"
  },
  carts: [],
  profilePics: {
    type: String,
  },
  
  },
  {
    timestamps: true,
  }
 
);
// module.exports =mongoose.model
// ("User", UserSchema);


UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();

  }catch (error) {
    next(error);
  }

});
module.exports = mongoose.model("User", UserSchema);