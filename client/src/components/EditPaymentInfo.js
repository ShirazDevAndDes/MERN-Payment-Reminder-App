import axios from "axios";
import { useState } from "react";
import Modal from "bootstrap/js/dist/modal";

export default function EditPaymentInfo({
  editFormInput,
  setEditFormInput,
  callback,
}) {
  const [errorMsg, setErrorMsg] = useState("");

  function InputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    console.log(name);
    console.log(value);
    setEditFormInput({
      ...editFormInput,
      [name]: value,
    });
  }

  function toggleModal() {
    let myModal = Modal.getOrCreateInstance("#edit-payment-modal");
    myModal.toggle();
  }

  async function submitForm() {
    console.log(editFormInput);
    await axios
      .post("api/updatePayment", editFormInput)
      .then((response) => {
        const res = response.data;
        console.log(res);
        if (res.success === "success") {
          callback();
        }
      })
      .catch(() => {});
  }

  async function deletePayment(id) {
    await axios
      .post("api/deletePayment", { id })
      .then((response) => {
        const res = response.data;
        console.log(res);
        if (res.success.length > 0) {
          callback();
          toggleModal();
        }
      })
      .catch((err) => {
        const res = err.response.data;
        console.log(res);
        // setErrorMsg(res);
      });
  }

  return (
    <div
      className="modal fade"
      id="edit-payment-modal"
      // data-bs-backdrop="false"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Payment</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {errorMsg.length > 0 && (
              <div className="mb-3">
                <div className="alert alert-danger" role="alert">
                  <strong>Error: </strong> {errorMsg}
                </div>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Client
              </label>
              <input
                type="text"
                className="form-control"
                name="client_name"
                value={editFormInput.client_name}
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
                value={editFormInput.description}
                onChange={InputChange}
              ></textarea>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-md-6">
                <label htmlFor="" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={editFormInput.amount}
                  placeholder=""
                  onChange={InputChange}
                />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="" className="form-label">
                  Date
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="datetime"
                  value={editFormInput.datetime || ""}
                  onChange={InputChange}
                />
              </div>
            </div>
            <button className="btn btn-success rounded-0" onClick={submitForm}>
              Submit
            </button>
            <button
              className="btn btn-danger float-end rounded-0"
              onClick={() => deletePayment(editFormInput.payment_id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
