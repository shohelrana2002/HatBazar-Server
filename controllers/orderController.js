import cartModel from "../models/cart.model.js";
import Order from "../models/order.model.js";
export const createOrder = async (req, res) => {
  try {
    const today = new Date();
    const date =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");
    const count = await Order.countDocuments({
      createdAt: {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lte: new Date(today.setHours(23, 59, 59, 999)),
      },
    });

    const orderId = `SH-${date}-${String(count + 1).padStart(10, "0")}`;
    const order = await Order.create({ ...req.body, orderId });
    res.status(201).json({
      success: true,
      message: "Order Created",
      order,
      orderId,
    });
  } catch (error) {
    console.log("ORDER ERROR:", error); // এটা যোগ করো

    res.status(500).json({
      success: false,
      message: error.message,
    });
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

/* ================ Get Order by Id =========  */

export const getOrderByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/*==== Updated By id === Transition o sender number updated */

export const updatePayment = async (req, res) => {
  try {
    const { orderId } = req.params;

    const { transactionId, senderNumber } = req.body;

    const order = await Order.findOneAndUpdate(
      { orderId },
      {
        transactionId,
        senderNumber,
        paymentStatus: "Pending",
      },
      {
        returnDocument: "after",
      },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Payment Submitted Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
