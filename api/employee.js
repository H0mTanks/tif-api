const { client } = require("../connection");

const getEmployees = (req, res) => {
  client.query("SELECT * FROM employees ORDER BY id ASC", (error, data) => {
    if (error) {
      return res
        .status(400)
        .json({ "Status Code": 400, Message: "Bad Request" });
    }
    res.status(200).json(data.rows);
  });
};

const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id);

  client.query(`SELECT * FROM employees WHERE id = ${id}`, (error, data) => {
    if (error) {
      return res.status(404).json({ "Status Code": 404, Message: "Not Found" });
    }
    return res.status(200).json(data.rows);
  });
};

const addEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(req.body.id);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const mobile_no = req.body.mobile_no;
  const email_id = req.body.email_id;

  // const str = `INSERT INTO employees (id, first_name, last_name, mobile_no, email_id)
  //     VALUES (${id}, ${first_name}, ${last_name}, ${mobile_no}, ${email_id}) RETURNING *`;

  // console.log(str);

  client.query(
    `INSERT INTO employees (id, first_name, last_name, mobile_no, email_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [id, first_name, last_name, mobile_no, email_id],
    (error, data) => {
      if (error) {
        res
          .status(400)
          .json({ "Status Code": 400, Message: "Bad Request in addEmployee" });
        return;
      }
      res.status(201).send(`Employee added with ID: ${data.rows[0]["id"]}`);
    }
  );
};

const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const mobile_no = req.body.mobile_no;
  const email_id = req.body.email_id;

  client.query(
    `UPDATE employees  SET first_name = $1, last_name = $2, mobile_no = $3, 
    email_id = $4 WHERE id = $5`,
    [first_name, last_name, mobile_no, email_id, id],
    (error, data) => {
      if (error) {
        res.status(404).json({ "Status Code": 404, Message: "Not Found" });
        return;
      }
      res.status(200).send(`Employee modified with ID: ${id}`);
    }
  );
};

const deleteEmployee = (req, res) => {
  const id = parseInt(req.params.id);

  client.query("DELETE FROM employees WHERE id = $1", [id], (error, data) => {
    if (error) {
      res.status(404).json({ "Status Code": 404, Message: "Not Found" });
      return;
    }
    res.status(200).send(`Employee deleted with ID: ${id}`);
  });
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
