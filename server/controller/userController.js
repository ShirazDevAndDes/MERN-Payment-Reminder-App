const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const conn = require("../db/db");

const jwtSecret = "1d5a6a";

const authUser = (req, res) => {
  const accessToken = req.header("x-auth-token");

  const user = jwt.verify(accessToken, jwtSecret);
};

const signup = async (req, res) => {
  const body = req.body;
  const username = body.username;
  const email = body.email;
  const password = body.password;

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const sql = "INSERT INTO user SET ?";
  const placeholder = { username, email, password: hashPass };
  conn.query(sql, placeholder, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      res.status(200).send("success");
    }
  });
};

const login = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  // console.log(body);
  const sql = "SELECT * FROM user WHERE email=?";
  const placeholder = [email];
  conn.query(sql, placeholder, async function (error, results, fields) {
    console.log("error: ", error);
    if (error) {
      res.status(404).send({ error: "Something went wrong" });
    } else {
      if (results.length > 0) {
        const user = results[0];
        // console.log(results);
        const hashPass = user.password;
        const verifyPass = await bcrypt.compare(password, hashPass);
        if (verifyPass) {
          const accessToken = jwt.sign({ id: user.user_id }, jwtSecret);
          const result = {
            username: user.username,
            email: user.email,
            accessToken,
          };
          res.status(200).send({ success: "success", result });
        } else {
          res.status(404).send({ error: "Password is not correct" });
        }
      } else {
        res.status(404).send({ error: "User does not exist" });
      }
    }
  });
};

module.exports = { signup, login };
