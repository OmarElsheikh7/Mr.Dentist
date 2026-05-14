const Shift = Object.freeze({
  MORNING:   { id: 0, start: "08:00", end: "16:00" },
  AFTERNOON: { id: 1, start: "16:00", end: "00:00" },
  NIGHT:     { id: 2, start: "00:00", end: "08:00" },
});


const getShiftById = (id) => Object.values(Shift).find(s => s.id === id);


module.exports = { Shift, getShiftById };
