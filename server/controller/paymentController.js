const conn = require("../db/db");

const savePayment = (req, res) => {
  const body = req.body;
  const client_name = body.client_name;
  const description = body.description;
  const amount = body.amount;
  const date_and_time = body.datetime;
  const sql = "INSERT INTO payments SET ?";
  const placeholder = { client_name, description, amount, date_and_time };
  conn.query(sql, placeholder, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      res.status(200).send("success");
    }
  });
};
const updatePayment = (req, res) => {
  const body = req.body;
  const payment_id = body.payment_id;
  const client_name = body.client_name;
  const description = body.description;
  const amount = body.amount;
  const date_and_time = body.datetime;
  const sql =
    "UPDATE payments SET client_name=?, description=?, amount=?, date_and_time=? WHERE payment_id=?";
  const placeholder = [
    client_name,
    description,
    amount,
    date_and_time,
    payment_id,
  ];
  conn.query(sql, placeholder, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      res.status(200).send({ success: "success", result: results });
    }
  });
};

const deletePayment = (req, res) => {
  const payment_id = req.body.id;

  const sql = "DELETE FROM payments WHERE payment_id=" + payment_id;
  conn.query(sql, function (error, result, fields) {
    if (error) {
      res.status(400).json({ error: "Payment not Deleted" });
    } else {
      if (result.affectedRows > 0 && result.message.length === 0) {
        res.status(200).json({ success: "Payment Deleted" });
      } else {
        res.status(400).json({ error: "Payment Does Not Exist" });
      }
    }
  });
};

const getAllPayments = (req, res) => {
  const sql =
    "SELECT *, DATE_FORMAT(date_and_time, '%e %b %y') AS date, DATE_FORMAT(date_and_time, '%h:%i %p') as time FROM payments";
  conn.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      res.status(200).send({ success: "success", result: results });
    }
  });
};
const getPaymentInfoByName = (req, res) => {
  const client_name = req.body.name;
  const sql = "SELECT * FROM payments WHERE ?";
  const placeholder = { client_name };
  conn.query(sql, placeholder, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      res.status(200).send({ success: "success", result: results[0] });
    }
  });
};
const getPaymentInfoByID = (req, res) => {
  const payment_id = req.query.id;
  console.log(payment_id);
  const sql =
    "SELECT *, DATE_FORMAT(date_and_time, '%Y-%m-%dT%T') AS datetime FROM payments WHERE ?";
  const placeholder = { payment_id };
  conn.query(sql, placeholder, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      res.status(200).send({ success: "success", result: results[0] });
    }
  });
};

module.exports = {
  savePayment,
  updatePayment,
  deletePayment,
  getAllPayments,
  getPaymentInfoByName,
  getPaymentInfoByID,
};
