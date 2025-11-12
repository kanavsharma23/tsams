import express from "express";
import Turf from "../models/turf.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all turfs
router.get("/", async (req, res) => {
  const turfs = await Turf.find();
  res.json(turfs);
});

// ✅ Check availability for a specific turf
router.post("/:id/availability",protect, async (req, res) => {
  const { date, startTime, endTime } = req.body;
  const turf = await Turf.findById(req.params.id);

  if (!turf) return res.status(404).json({ message: "Turf not found" });

  const conflict = turf.bookings.some(b =>
    b.date === date &&
    ((startTime >= b.startTime && startTime < b.endTime) ||
     (endTime > b.startTime && endTime <= b.endTime))
  );

  if (conflict) {
    return res.json({ available: false, message: "Slot not available" });
  } else {
    return res.json({ available: true, message: "Slot available" });
  }
});

// ✅ Book a slot
router.post("/:id/book", protect, async (req, res) => {
  const { date, startTime, endTime } = req.body;
  const turf = await Turf.findById(req.params.id);

  if (!turf) return res.status(404).json({ message: "Turf not found" });

  const conflict = turf.bookings.some(b =>
    b.date === date &&
    ((startTime >= b.startTime && startTime < b.endTime) ||
     (endTime > b.startTime && endTime <= b.endTime))
  );

  if (conflict) return res.status(400).json({ message: "Slot already booked" });

  turf.bookings.push({
    user: req.user._id,
    date,
    startTime,
    endTime,
  });

  await turf.save();
  res.json({ message: "Booking successful ✅", turf });
});

// ✅ Cancel booking
router.delete("/:id/cancel", protect, async (req, res) => {
  const { date, startTime, endTime } = req.body;
  const turf = await Turf.findById(req.params.id);

  if (!turf) return res.status(404).json({ message: "Turf not found" });

  turf.bookings = turf.bookings.filter(
    b =>
      !(
        b.user.toString() === req.user._id.toString() &&
        b.date === date &&
        b.startTime === startTime &&
        b.endTime === endTime
      )
  );

  await turf.save();
  res.json({ message: "Booking cancelled ❌", turf });
});

export default router;

