import axios from "axios";
import { useEffect, useState } from "react";
import AddPayments from "../components/AddPayments";
import ShowPayments from "../components/ShowPayments";

export default function Dashboard() {
  const [payments, setPayments] = useState(false);
  async function getAllPayments() {
    await axios
      .get("api/getAllPayments")
      .then((response) => {
        const res = response.data;
        // console.log(res);
        setPayments(res.result);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getAllPayments();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="card col-12 col-lg-8 mt-5 shadow-sm">
          <div className="card-body">
            <AddPayments getAllPayments={getAllPayments} />
            {payments && (
              <ShowPayments payments={payments} callback={getAllPayments} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
