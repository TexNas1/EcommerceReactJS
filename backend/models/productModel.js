import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  image: { type: String, required: true },
  detailImage1: { type: String, required: true },
  detailImage2: { type: String, required: true },
  detailImage3: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
  condition: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  location: { type: String, required: true },
  subCategory: { type: String, required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;