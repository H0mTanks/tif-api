const express = require("express");
const attendance = express.Router();

const {
  getAttendanceData,
  getAttendanceById,
  addAttendance,
  updateAttendance,
} = require("./api/attendance");

attendance.route("/").get(getAttendanceData);
attendance
  .route("/:id")
  .get(getAttendanceById)
  .post(addAttendance)
  .patch(updateAttendance);

module.exports = attendance;
