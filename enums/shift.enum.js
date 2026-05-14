/**
 * Shift Enum — defines the three clinic shifts.
 *
 *   MORNING   : 08:00 – 04:00pm   
 *   AFTERNOON : 04:00pm – 00:00
 *   NIGHT     : 00:00 – 08:00
 *
 * The object (and every nested value) is deeply frozen so that
 * no part of the enum can be mutated at runtime.
 */

const Shift = Object.freeze({
  MORNING: Object.freeze({
    id: 0,
    start: "08:00",
    end: "16:00",
  }),
  AFTERNOON: Object.freeze({
    id: 1,
    start: "16:00",
    end: "00:00",
  }),
  NIGHT: Object.freeze({
    id: 2,
    start: "00:00",
    end: "08:00",
  }),
});



module.exports = { Shift, getShiftById, VALID_SHIFT_IDS };
