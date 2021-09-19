import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addemail } from "../features/userSlice";
function AddEmail() {
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    setemail(e.target.value);
  };
  const saveEmail = (e) => {
    dispatch(
      addemail({
        email: email,
      })
    );
  };
  return (
    <div className="member-container d-flex flex-wrap">
      <div className="member-left d-lg-flex align-items-lg-center justify-content-lg-end">
        <div>
          <div className="member-form-box">
            <form>
              <h1>Enter your email</h1>
              <div className="form-box">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control "
                    id="email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </div>
              </div>
              <div className="member-btn">
                <Link
                  to="/addinfo"
                  onClick={saveEmail}
                  className="btn btn-primary btn-md btn-block"
                >
                  Next
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmail;
