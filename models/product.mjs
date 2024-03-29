import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Brand',
    },
    price: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
      required: false,
      default: 0,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
