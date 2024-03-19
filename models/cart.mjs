import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // products: [
    //   {
    //     _id: {
    //       type: Schema.Types.ObjectId,
    //       required: true,
    //       ref: 'Product',
    //     },
    //     quantity: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);
