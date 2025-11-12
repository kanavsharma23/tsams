import express from "express";
import Booking from "../models/Booking.js";
import Item from "../models/Item.js";
import Turf from "../models/turf.js";
import protect from "../middleware/authMiddleware.js";
import QRCode from "qrcode";

const router = express.Router();

/**
 * Create a new booking (either Equipment or Turf)
 */
router.post("/", protect, async (req, res) => {
  try {
    const { items, turfId, date, slot } = req.body;

    // 🏟️ ---- TURF BOOKING ----
    if (turfId) {
      const turf = await Turf.findById(turfId);
      if (!turf) {
        return res.status(404).json({ message: "Turf not found" });
      }

      // Check if slot is already booked for that date
      const existingBooking = await Booking.findOne({
        turf: turfId,
        date,
        slot,
        status: { $ne: "rejected" }, // only block if not rejected
      });

      if (existingBooking) {
        return res.status(400).json({ message: "This slot is already booked" });
      }

      // Create new turf booking
      const booking = await Booking.create({
        user: req.user._id,
        turf: turfId,
        date,
        slot,
      });

      // Generate QR code
      const qrData = JSON.stringify({ bookingId: booking._id });
      const qrCode = await QRCode.toDataURL(qrData);
      booking.qrCode = qrCode;
      await booking.save();

      return res.json(booking);
    }

    // 🎒 ---- EQUIPMENT BOOKING ----
    if (!items || !items.length) {
      return res.status(400).json({ message: "No items provided for booking" });
    }

    // Check stock availability
    for (let i of items) {
      const dbItem = await Item.findById(i.item);
      if (!dbItem || dbItem.available < i.quantity) {
        return res.status(400).json({ message: `Item ${dbItem?.name || i.item} not enough stock` });
      }
    }

    // Deduct stock immediately
    for (let i of items) {
      const dbItem = await Item.findById(i.item);
      dbItem.available -= i.quantity;
      await dbItem.save();
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      items,
    });

    // Generate QR code
    const qrData = JSON.stringify({ bookingId: booking._id });
    const qrCode = await QRCode.toDataURL(qrData);
    booking.qrCode = qrCode;
    await booking.save();

    // Auto-delete pending equipment booking after 2 minutes
    setTimeout(async () => {
      try {
        const bookingCheck = await Booking.findById(booking._id).populate("items.item");

        if (bookingCheck && bookingCheck.status === "pending") {
          // Restore stock
          for (let i of bookingCheck.items) {
            i.item.available += i.quantity;
            await i.item.save();
          }

          // Delete booking
          await Booking.findByIdAndDelete(booking._id);
          console.log(`⏰ Auto-deleted pending booking ${booking._id}`);
        }
      } catch (err) {
        console.error("Auto-delete error:", err);
      }
    }, 2 * 60 * 1000);

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Manager approves/rejects/returns booking
 */
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id)
      .populate("items.item")
      .populate("turf");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Restore stock if rejected or returned (for equipment)
    if (["rejected", "returned"].includes(status) && booking.items?.length > 0) {
      for (let i of booking.items) {
        i.item.available += i.quantity;
        await i.item.save();
      }
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Get all bookings (for manager)
 */
router.get("/", async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "name email")
    .populate("items.item")
    .populate("turf");
  res.json(bookings);
});

/**
 * Get single booking by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.item")
      .populate("turf");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error fetching booking" });
  }
});

export default router;
