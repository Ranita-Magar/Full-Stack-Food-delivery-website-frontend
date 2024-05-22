import React, { useContext, useEffect } from "react";
import axios from "axios";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext); // we'll backend url from context API
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  // we use this function when the page is loading so use useEffect
  useEffect(() => {
    verifyPayment();
  }, []);

  // console.log(success, orderId);

  return (
    // display spinner on the website until the payment gets verified
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
