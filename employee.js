const express = require("express");
const employee = express.Router();

const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./api/employee");

employee.route("/").get(getEmployees);
employee
  .route("/:id")
  .get(getEmployeeById)
  .post(addEmployee)
  .patch(updateEmployee)
  .delete(deleteEmployee);

module.exports = employee;
