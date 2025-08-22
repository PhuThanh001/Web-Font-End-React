const mongoose = require('mongoose');
import Order from "./orderModel.js"; // đường dẫn tới file model Order của bạn

const run = async () => {
  try {
    // 🔗 Kết nối tới MongoDB
    await mongoose.connect("mongodb+srv://phunguyensc203:gwL7TEUiFK5zs5MS@cluster0.m3wgvwk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Đã kết nối MongoDB");

    // 📌 Xóa index bị lỗi
    await Order.collection.dropIndex("orderItems.amount_1");

    console.log("🟢 Đã xóa index orderItems.amount_1 thành công");

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Lỗi:", err.message);
  }
};

run();
