import { Schema, model } from 'mongoose';
import { IOrder, ProductModel } from './order.interface';
const OrderSchema = new Schema<IOrder, ProductModel>(
  {
    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
    email: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Order = model<IOrder, ProductModel>('Order', OrderSchema);
