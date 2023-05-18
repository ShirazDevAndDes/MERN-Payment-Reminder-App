import axios from "axios";
import { useState } from "react";

export default function AddPayments({ getAllPayments }) {
  const [formInput, setFormInput] = useState({});

  function InputChange(e) {
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
      .post("api/savePayment", formInput)
      .then((response) => {
        const res = response.data;
        console.log(res);
        if (res === "success") {
        }
      })
      .catch(() => {});
    console.log(formInput);
    getAllPayments();
  }

  return (
    <div>
      <button
        className="btn btn-outline-success mb-3 w-100"
        data-bs-toggle="modal"
        data-bs-target="#add-payment-modal"
      >
        Add Payment <b className="fs-5">+</b>
      </button>

      <div className="modal fade" id="add-payment-modal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Payment</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Client
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="client_name"
                  placeholder="Client Name"
                  onChange={InputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  onChange={InputChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  placeholder="Total Amount"
                  onChange={InputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Date
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="datetime"
                  onChange={InputChange}
                />
              </div>
              <button className="btn btn-success" onClick={submitForm}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
