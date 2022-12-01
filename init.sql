DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS employees;

CREATE TABLE employees(
id INT PRIMARY KEY,
first_name TEXT,
last_name TEXT,
mobile_no TEXT,
email_id TEXT
);

INSERT INTO employees (id, first_name, last_name, mobile_no, email_id)
    VALUES (1, 'emp1fname', 'emp1lname', '1234567890', 'emp1@gmail.com') RETURNING *;
	
INSERT INTO employees (id, first_name, last_name, mobile_no, email_id)
    VALUES (2, 'emp2fname', 'emp2lname', '1234567890', 'emp2@gmail.com') RETURNING *;
	
CREATE TABLE attendance(
	employee_id INT,
	checkin_time TIMESTAMP,
	checkout_time TIMESTAMP,
	
	CONSTRAINT fk_employee
      FOREIGN KEY(employee_id) 
      REFERENCES employees(id)
      ON DELETE CASCADE
);

INSERT INTO attendance (employee_id, checkin_time)
	VALUES (1, now());
	
UPDATE attendance SET checkout_time=now() WHERE employee_id = 1 AND checkin_time=(SELECT checkin_time FROM attendance WHERE employee_id = 1 ORDER BY checkin_time DESC LIMIT 1);

INSERT INTO attendance (employee_id, checkin_time)
	VALUES (2, now());
	
UPDATE attendance SET checkout_time=now() WHERE employee_id = 2 AND checkin_time=(SELECT checkin_time FROM attendance WHERE employee_id = 2 ORDER BY checkin_time DESC LIMIT 1);