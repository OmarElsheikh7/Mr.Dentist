const Appointment = require("../Models/Appointment");

function generateSlots(shiftStart, shiftEnd, intervalMinutes = 20) {
  const slots = [];
  let current = new Date(`1970-01-01T${shiftStart}:00`);
  let end = new Date(`1970-01-01T${shiftEnd}:00`);

  // Handle overnight shift (e.g. 16:00 → 00:00)
  if (end <= current) {
    end.setDate(end.getDate() + 1);
  }

  while (current < end) {
    slots.push(current.toTimeString().slice(0, 5));
    current = new Date(current.getTime() + intervalMinutes * 60000);
  }

  return slots;
}


module.exports = { generateSlots };