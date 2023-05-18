const { Router } = require("express");
const {
  savePayment,
  updatePayment,
  deletePayment,
  getAllPayments,
  getPaymentInfoByName,
  getPaymentInfoByID,
} = require("../controller/paymentController");
const { signup, login } = require("../controller/userController");
const routes = Router();

routes.post("/signup", signup);

routes.post("/login", login);

// routes.get("/auth", authUser);

routes.post("/savePayment", savePayment);

routes.post("/updatePayment", updatePayment);
routes.post("/deletePayment", deletePayment);

routes.get("/getAllPayments", getAllPayments);

routes.get("/getPaymentInfoByName", getPaymentInfoByName);

routes.get("/getPaymentInfoByID", getPaymentInfoByID);

module.exports = routes;
