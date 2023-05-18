import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  function inputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setFormInput({
      ...formInput,
      [name]: value,
    });
  }

  async function submitForm() {
    await axios
      .post("api/login", formInput)
      .then((response) => {
        const res = response.data;
        console.log(res);
        sessionStorage.setItem("user", JSON.stringify(res.result));
        navigate("/dashboard");
      })
      .catch((err) => {
        const res = err.response.data;
        console.log(res);
        setErrorMsg(res.error);
      });
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center minvh-100">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="display-4 mb-4 text-center">Login</div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  onChange={inputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={inputChange}
                />
              </div>
              <p>
                Don't have an account <Link to="/signup">Sign Up</Link>
              </p>
              <button className="btn btn-primary" onClick={submitForm}>
                Submit
              </button>
              {errorMsg.length > 0 && (
                <div className="alert alert-danger mt-3" role="alert">
                  <strong>Error: </strong> {errorMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
