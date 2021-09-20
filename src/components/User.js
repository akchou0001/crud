import React, { useState } from "react";
import CrudDataService from "../services/crud.service";
import { Link } from "react-router-dom";
import helpcircle from "../images/help-circle.svg";
import eye from "../images/eye.svg";
import eyeOff from "../images/eye-off.svg";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function User() {
  const history = useHistory();
  const reduxuser = useSelector(selectUser);
  const [email, setemail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setpassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const onChangeEmail = (e) => {
    setemail(e.target.value);
  };
  const onChangeFname = (e) => {
    setfirstName(e.target.value);
  };
  const onChangeLname = (e) => {
    setlastName(e.target.value);
  };
  const onChangePassword = (e) => {
    setpassword(e.target.value);
  };
  const updateUser = (e) => {
    e.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
    };
    async function addUser() {
      await CrudDataService.update(reduxuser.id, data)
        .then((response) => {
          console.log(response.data);
          alert("User updated successfully!");
          history.push("/users");
        })
        .catch((e) => {
          console.log(e);
        });
    }
    addUser();
  };
  return (
    <>
      <div className="member-container d-flex flex-wrap">
        <div className="member-left d-lg-flex align-items-lg-center justify-content-lg-end">
          <div className="member-form-box">
            <form>
              <h1>Let's create your account</h1>
              <div className="form-box">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control "
                    id="email"
                    value={!email ? reduxuser.email : email}
                    onChange={onChangeEmail}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstname">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={!firstName ? reduxuser.firstName : firstName}
                        onChange={onChangeFname}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastname">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={!lastName ? reduxuser.lastName : lastName}
                        onChange={onChangeLname}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-intro-box d-flex align-items-center">
                    <label htmlFor="password">Password</label>
                    {/* Add Framer Motion */}
                    <a
                      href="#"
                      tabIndex="0"
                      className="help-popover ml-2"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="top"
                      data-content="Lorem ipsum dolor sit amet, consectetur adipiscing"
                    >
                      <img src={helpcircle} alt="" />
                    </a>
                  </div>
                  <div className="input-group">
                    <input
                      type={passwordShown ? "text" : "password"}
                      name="your_pass"
                      id="password-field"
                      className="form-control"
                      value={!password ? reduxuser.password : password}
                      onChange={onChangePassword}
                    />
                    <span>
                      <i
                        className="toggle-password"
                        toggle="#password-field"
                        onClick={togglePasswordVisiblity}
                      >
                        {passwordShown ? (
                          <span>
                            <img src={eye} alt="" />
                          </span>
                        ) : (
                          <span>
                            <img src={eyeOff} alt="" />
                          </span>
                        )}
                      </i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="member-btn">
                <Link
                  to="/users"
                  onClick={updateUser}
                  className="btn btn-primary btn-md btn-block"
                >
                  Update
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
