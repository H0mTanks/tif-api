# TIF Attendance Tracker API

This project is dependant on `nodejs`, `npm` and `postgreSQL`. Please install them before using this API.

## Project Setup

1. Download or clone the project.
2. Now go to projects root folder, i.e.
   ```sh
   cd ~/tif-api
   ```
3. Run the command below to setup environment and install project dependenies.
   ```sh
   npm install
   ```
4. Add your postgres local password to the client object in connection.js. We use all the other localhost defaults.

## Run the Server

- Run below command to start the server
  ```sh
  npx nodemon app.js
  ```

## Usage Instructions

1. To setup a sample database, run the init.sql file in your local postgres shell with
   `\i path_to_init.sql`
2. Get all employees by making a GET request to /employee.
3. Get an employee by id making a GET request to /employee/:id.
4. Add a new employee by making a POST request to /employee/:id with the following json format in the body.
   ```
   {
   "first_name": "emp3fname",
   "last_name": "emp3lname",
   "mobile_no": "1234567890",
   "email_id": "emp3@gmail.com"
   }
   ```
5. Get attendance of all employees by making a GET request to /attendance.
6. Get attendance of an employee by id by making a GET request to /attendance/:id.
7. Add a new checkin entry for an employee by making a POST request to /attendance/:id.
8. Add a new checkout entry of an employee by making a PATCH request to /attendance/:id.
9. Delete an employee with id by making a DELETE request to /employee/:id.
