import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    offeredPrice: {
      type: Number,
      default: null,
    },

    save: {
      type: String,
      default: null,
    },

    badge: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
      enum: ["combo", "mango", "honey", "dates", "spices", "oil"],
    },
    selling: {
      bestSelling: {
        type: Boolean,
        default: false,
      },

      offered: {
        type: Boolean,
        default: false,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
