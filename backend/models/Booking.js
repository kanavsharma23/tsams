import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Equipment items (optional)
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number, required: true },
    },
  ],

  // Turf booking (optional)
  turf: { type: mongoose.Schema.Types.ObjectId, ref: "Turf" },
  date: { type: String },  // e.g. "2025-11-04"
  slot: { type: String },  // e.g. "8–10 AM"

  // Common fields
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "returned"],
    default: "pending",
  },
  qrCode: { type: String }, // will store QR code data (base64)
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
