import axios from "axios";
import { useState } from "react";
import EditPaymentInfo from "./EditPaymentInfo";

import Modal from "bootstrap/js/dist/modal";

export default function ShowPayments({ payments, callback }) {
  const [searchValue, setSearchValue] = useState("");

  const [editFormInput, setEditFormInput] = useState({
    payment_id: "",
    client_name: "",
    description: "",
    amount: "",
    date: "",
    time: "",
  });

  function toggleModal() {
    let myModal = Modal.getOrCreateInstance("#edit-payment-modal");
    myModal.toggle();
  }

  async function getPaymentInfoByName(name) {
    await axios
      .get("api/getPaymentInfoByName")
      .then((response) => {
        const res = response.data;
        console.log(res);
        // setEditFormInfo(res);
      })
      .catch(() => {});
  }

  async function getPaymentInfoByID(id) {
    await axios
      .get("api/getPaymentInfoByID", { params: { id } })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setEditFormInput(res.result);

        toggleModal();
      })
      .catch(() => {});
  }

  return (
    <div className="row">
      {payments && (
        <EditPaymentInfo
          editFormInput={editFormInput}
          setEditFormInput={setEditFormInput}
          callback={callback}
        />
      )}
      {payments &&
        payments.map((payment, index) => (
          <div key={index} className="col-12 col-sm-6 mb-3">
            <div
              className="card pointer"
              // data-bs-toggle="modal"
              // data-bs-target="#edit-payment-modal"
              onClick={() => getPaymentInfoByID(payment.payment_id)}
            >
              <div className="card-body">
                <h4 className="card-title">{payment.client_name}</h4>
                <p className="card-text">{payment.description}</p>
                <hr />
                <div className="d-flex">
                  <small className="text-muted me-auto">
                    Time: {payment.time}
                  </small>
                  <small className="text-muted">Date: {payment.date}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
