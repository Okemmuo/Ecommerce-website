const asyncHandler = require("express-async-handler");
const Product = require("../Schema/Product");
const cloudinary =require("../Services/Cloudinary");

    
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        Price,
        discount_Price,
        desc,
        img,
        Quantity,
        Variety,
        Category,
        Brand,
      } = req.body;
    try {
       const productExists =await Product.findOne({name});
       if (productExists) {
        res.status(506).json({
            message: "Product already Exists",
        });
       }

// uploade img to cloudinary
const uploadedImages = await Promise.all(
    img.map(async (image) => {
      const result = await cloudinary.uploader.upload(image, {
        folder: "products", // Optional: store images in a specific folder in Cloudinary
        resource_type: "image",
        fileName: `${req.body.name}.jpg`,
     });

      return {
        url: result.secure_url,
      };
    })
  );





    const newProducts = await Product.create({
        name,
        Price,
        discount_Price,
        desc,
        img:uploadedImages,
        Quantity,
        Variety,
        Category,
        Brand,
       
    });
    res.status(200).json({
      _id: newProducts._id,
    name: newProducts.name, 
    Price: newProducts.Price,
    discount_Price: newProducts.discount_Price,
    desc: newProducts.desc,
    img: newProducts.img,
    Quantity: newProducts.Quantity,
    Variety: newProducts.Variety,
    Brand: newProducts.Brand,

    message: "Successful",
    });
} catch (error) {
    res.status(401).json({
        message: "Error",
        error,
    });
}
});

const postProduct = asyncHandler(async (req, res) => { 
    const {
        name,
        Price,
        discount_Price,
        desc,
        img,
        Quantity,
        Variety,
        Category,
        Brand,

    }=req.body
    try {
       const uploadImages = await Promise.all(
        img.map(async (image) =>{
            try {
                const result = await cloudinary.uploader.upload(image, {
                    folder: "Products",
                    resource_type: "image", 
                });
                return {
                  url: result.secure_url,
                };
              } catch (error) {
                throw new Error("Failed to upload image");
              }
            })
          );
          const createProduct = await Product.create({
            name,
            Price,
            discount_Price,
            desc,
            img:uploadImages,
            Quantity,
            Variety,
            Category,
            Brand,


          });
          res.status(200).json({
            createProduct,

          });
    } catch (error) {
    res.status(401).json({
      message: "Failed to create",
      error,
  });
   }
});


/* const format = asyncHandler(async(req, res)=>{


  try {

  } catch (error) {
    res.status(689).json({
      message: "Error",
      error,
    });
  }
}); */


const getAllProduct = asyncHandler(async(req, res)=>{
  try {
    const product = await Product.find().sort({createdAt: -1});
    res.json({
      product,
    });

  } catch (error) {
    res.status(689).json({
      message: "failed to fectch product",
      error,
    });
  }
});



const getSingleProduct = asyncHandler(async(req, res)=>{
const {id} = req.params;
  try {
    const product = await Product.findById(id);
    res.json({
      product,
    })
  } catch (error) {
    res.status(689).json({
      message: "Failed to fectch Product",
      error,
    });
  }
}); 





const updateProducts = asyncHandler(async(req, res)=>{
  const {id} = req.params;
  const {
        name,
        Price,
        discount_Price,
        desc,
        img,
        Quantity,
        Variety,
        Category,
        Brand,
        Comment,
        Rating,
    } = req.body;
  try {

const updateProduct = await Product.findById(id);
if (!updateProduct) {
  res.status(404).json({
    message: "Product not found",
  });
}

const uploadedImages = await Promise.all(
  img.map(async (image) => {
    const result = await cloudinary.uploader.upload(image, {
      folder: "products", // Optional: store images in a specific folder in Cloudinary
      resource_type: "image",
      fileName: `${req.body.name}.jpg`,
   });

    return {
      url: result.secure_url,
    };
  })
);

updateProduct.name = name || updateProduct.name;
updateProduct.Price = Price || updateProduct.Price;
updateProduct.Variety = Variety || updateProduct.Variety;
updateProduct.Category = Category || updateProduct.Category;
updateProduct.Brand = Brand|| updateProduct.Brand;
updateProduct.discount_Price = discount_Price || updateProduct.discount_Price;
updateProduct.desc = desc|| updateProduct.desc;
updateProduct.Quantity = Quantity|| updateProduct.Quantity;
updateProduct.img = uploadedImages || updateProduct.img;
updateProduct.Rating = Rating || updateProduct.Rating;
updateProduct.Comment = Comment || updateProduct.Comment;

await updateProduct.save();
res.status(200).json({
  message: "Update Succesful",
  updateProduct,
});
  } catch (error) {
    res.status(402).json({
      message: "Error",
      error,
    });
  }
});






const deleteProduct = asyncHandler(async (req, res) => {
  const{id}= req.params
    try {
      const deleteRequest =await Product.findByIdAndDelete(id);
      if(!deleteRequest){
        res.status(200).json({
          message: "Product not found",
        });
      }
      res.status(300).json({
        message: "delete successful",
        deleteRequest, 
        // if you want to return your deleted data


      });
     
    } catch (error) {
      res.status(401).json({
        message: "Failed to create",
        error,
    });
    }
});



        


module.exports = {
  createProduct,
  postProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProducts
 

};


