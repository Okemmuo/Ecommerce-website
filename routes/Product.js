
const express =require("express");
const { createProduct, postProduct, getAllProduct, getSingleProduct, updateProducts, deleteProduct} = require("../controller/Product");


const router = express.Router();
  router.post("/", createProduct);
  // router.post("/pst", postProduct);
  router.get("/get", getAllProduct);
  router.get("/:id", getSingleProduct);
  router.put("/:id", updateProducts);
  router.delete("/:id", deleteProduct);

    module.exports = router; 