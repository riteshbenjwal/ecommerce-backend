const Product = require("../models/product");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cloudinary = require("cloudinary");
import { WhereClause } from "../utils/whereClause";

exports.addProduct = BigPromise(async (req, res, next) => {
  //images are coming as an array

  let imageArray = [];

  //checking if images are present

  if (req.files) {
    return next(new CustomError("No images found", 400));
  }

  //Uploading images to cloudinary

  if (req.files) {
    for (let index = 0; index < req.files.photos.length; index++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.photos[index].tempFilePath,
        {
          folder: "products",
        }
      );
      imageArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  req.body.photos = imageArray;
  req.body.user = req.user.id;

  //Creating product

  const product = await Product.create(req.body);

  res.status(201).json({
    status: "true",
    product,
  });
});

exports.getAllProduct = BigPromise(async (req, res, next) => {
  const resultPerPage = 6;
  const totalCountProduct = await Product.countDocuments();

  const products = new WhereClause(Product.find(), req.query).search().filter();

  const filteredProductNumber = await products.length;
  // products.limit().skip();

  products.pager(resultPerPage);

  products = await products.base;

  res.status(200).json({
    success: true,
    products,
    filteredProductNumber,
    totalCountProduct,
  });
});
