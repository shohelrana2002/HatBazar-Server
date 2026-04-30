import cartModel from "../models/cart.model.js";
import orderModel from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const { shippingAddress } = req.body;

    const cart = await cartModel
      .findOne({ user: userId })
      .populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    let totalPrice = 0;

    const orderItems = cart.products.map((item) => {
      totalPrice += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const order = await orderModel.create({
      user: userId,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    // clear cart after order
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "orderItems.product",
    );

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("orderItems.product");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
