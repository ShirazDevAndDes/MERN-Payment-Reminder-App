import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formInput, setFormInput] = useState({
    username: "",
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
      .post("api/signup", formInput)
      .then((response) => {
        const res = response.data;
        console.log(res);
      })
      .catch((err) => {
        const error = err;
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center minvh-100">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="display-4 mb-4 text-center">Sign Up</div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  placeholder="Enter Username"
                  onChange={inputChange}
                />
              </div>
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
                Already have an account <Link to="/">Login</Link>
              </p>
              <button className="btn btn-primary" onClick={submitForm}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
