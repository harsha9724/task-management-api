const mongoose = require("mongoose");

function connectToDb(url) {
  try {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(url);
      console.log("🟢 Connected to MongoDB");
    } else {
      console.log("⚠️ MongoDB already connected");
    }
    // mongoose.connect(url);
    // console.log("✅ connect to DB");
  } catch (err) {
    console.log("❌ error in connecting to DB", err.message);
  }
}

module.exports = { connectToDb };
