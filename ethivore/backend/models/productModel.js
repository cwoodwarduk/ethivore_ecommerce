import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: {type: Number, default: 0 },
    comment: { type: String, required: true}
    },
    {
        timestamps: true
    }
);

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
    no_of_reviews: { type: Number, default: 0, required: true },
    count_in_stock: { type: Number, default: 0, required: true },
    reviews: [reviewSchema]
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;