const { client } = require("../connection");

const getAttendanceData = (req, res) => {
  client.query(
    `SELECT employees.id, employees.first_name, employees.last_name, attendance.checkin_time, attendance.checkout_time FROM employees
        INNER JOIN attendance ON employees.id=attendance.employee_id 
        ORDER BY id ASC;`,
    (error, data) => {
      if (error) {
        return res
          .status(400)
          .json({ "Status Code": 400, Message: "Bad Request" });
      }
      res.status(200).json(data.rows);
    }
  );
};

const getAttendanceById = (req, res) => {
  const id = parseInt(req.params.id);

  client.query(
    `SELECT employees.id, employees.first_name, employees.last_name, attendance.checkin_time, attendance.checkout_time FROM employees
        INNER JOIN attendance ON employees.id=attendance.employee_id WHERE employees.id = $1 
        ORDER BY id ASC;`,
    [id],
    (error, data) => {
      if (error) {
        res.status(404).json({ "Status Code": 404, Message: "Not Found" });
        return;
      }
      res.status(200).json(data.rows);
    }
  );
};

const addAttendance = (req, res) => {
  const id = parseInt(req.params.id);

  client.query(
    `INSERT INTO attendance (employee_id, checkin_time)
	VALUES ($1, now()) RETURNING *;`,
    [id],
    (error, data) => {
      if (error) {
        res.status(400).json({
          "Status Code": 400,
          Message: "Bad Request in addAttendance",
        });
        return;
      }
      res
        .status(201)
        .send(`Attendance added with ID: ${data.rows[0]["employee_id"]}`);
    }
  );
};

const updateAttendance = (req, res) => {
  const id = parseInt(req.params.id);

  client.query(
    `UPDATE attendance SET checkout_time=now() WHERE employee_id = $1 AND checkin_time=(SELECT checkin_time FROM attendance WHERE employee_id = $1 ORDER BY checkin_time DESC LIMIT 1) RETURNING *;`,
    [id],
    (error, data) => {
      if (error) {
        res.status(400).json({
          "Status Code": 400,
          Message: "Bad Request in addAttendance",
        });
        return;
      }
      res
        .status(201)
        .send(`Attendance updated with ID: ${data.rows[0]["employee_id"]}`);
    }
  );
};

module.exports = {
  getAttendanceData,
  getAttendanceById,
  addAttendance,
  updateAttendance,
};
