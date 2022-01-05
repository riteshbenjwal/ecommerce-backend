const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    reuired: [true, "Please Provide product name"],
    trim: true,
    maxlength: [120, "Product name should be less than 120 characters"],
  },

  price: {
    type: Number,
    required: [true, "Please Provide product price"],
    maxlength: [5, "Product Price should not be more than 5 digits"],
  },

  description: {
    type: String,
    required: [true, "Please Provide Product description"],
  },

  photos: [
    {
      id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select category from dropdown"],
    enum: {
      values: ["shortsleeves", "longsleeves", "tshirts", "hoodies"],
      message: "Please select category from dropdown",
    },
  },
  brand: {
    type: String,
    required: [true, "Please select brand from dropdown"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
