import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userEmail: { type: String },
    userName: { type: String },
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    customer: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
    },

    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String },
        image: { type: String },
        price: { type: Number }, // String na, Number
        quantity: { type: Number }, // String na, Number
      },
    ],

    subtotal: { type: Number, required: true }, // "1500" default value chilo — bhul
    deliveryCharge: { type: Number, default: 0 },
    total: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "bKash", "Nagad"],
      default: "Cash on Delivery",
    },

    senderNumber: { type: String, default: "" },
    transactionId: { type: String, default: "" },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }, // createdAt/updatedAt automatic
);

export default mongoose.model("Order", orderSchema);
