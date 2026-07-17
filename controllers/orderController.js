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
    return res.status(201).json({
      success: true,
      message: "Order Created",
      order,
      orderId,
    });
  } catch (error) {
    console.log("ORDER ERROR:", error); // এটা যোগ করো

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//=================================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userEmail: req.user.email,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//=================================

export const getAllOrders = async (req, res) => {
  try {
    const { days = "all" } = req.query;

    let filter = {};

    // Today
    if (days === "today") {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      filter.createdAt = {
        $gte: start,
        $lte: end,
      };
    }

    // 7 / 15 / 30 / 90
    else if (days !== "all") {
      const date = new Date();
      date.setDate(date.getDate() - Number(days));

      filter.createdAt = {
        $gte: date,
      };
    }

    const orders = await Order.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
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

    return res.json(order);
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
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/*========== Updated send Number o Transition number =======  */

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

    return res.json({
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

/*========== Admin Routes Admin REject Or Accept =======  */

export const updatePaymentStatus = async (req, res) => {
  try {
    const io = req.app.get("io");

    const { id } = req.params;
    const { paymentStatus } = req.body;

    const validStatus = ["Pending", "Approved", "Rejected"];

    if (!validStatus.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { paymentStatus },
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
    console.log(order.userEmail);
    //     h sSocket Notification
    io.to(order.userEmail).emit("payment-status-updated", {
      orderId: order.orderId,
      paymentStatus: order.paymentStatus,
    });
    console.log("Socket emitted to:", order.userEmail);
    return res.status(200).json({
      success: true,
      message: `Payment ${paymentStatus} successfully.`,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
