import { userForgotPassword } from "@/store/slice/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ResetForm = ({ path }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(
      userForgotPassword({
        email,
      })
    )
      .unwrap()
      .then(() => navigate("/login"))
      .catch((err) => console.error("Error: ", err));
  };
  return (
    <>
      <h2 className="fs-20 fw-bolder mb-4">Forgot Password</h2>
      <h4 className="fs-13 fw-bold mb-2">Reset your password</h4>
      <p className="fs-12 fw-medium text-muted">
        Enter your email and a new password will sent to you.
      </p>
      <form onSubmit={handleForgotPassword} className="w-100 mt-4 pt-2">
        <div className="mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-lg btn-primary w-100">
            Reset Password
          </button>
        </div>
      </form>
      <div className="mt-5 text-muted">
        <span> Already have an account?</span>
        <a href="/login" className="fw-bold">
          {" "}
          Login here
        </a>
      </div>
    </>
  );
};

export default ResetForm;
