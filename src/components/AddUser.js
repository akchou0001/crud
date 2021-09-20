import React, { useState } from "react";
import { useSelector } from "react-redux";
import CrudDataService from "../services/crud.service";
import helpcircle from "../images/help-circle.svg";
import eye from "../images/eye.svg";
import eyeOff from "../images/eye-off.svg";
import { useHistory } from "react-router";
import { selectUser } from "../features/userSlice";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
const Container = styled.div`
  text-align: center;
`;
const StyledReactTooltip = styled(ReactTooltip)`
  background-color: white !important;
  color: black !important;
  box-shadow: 0px 2px 20px lightgray;
  &:after {
    border-top-color: white !important;
  }
`;
function AddUser() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const email = user.email;
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setpassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [enabledThing, setEnabledThing] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  function refresh(e) {
    history.push("/");
  }
  const saveUser = (e) => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
    };
    e.preventDefault();
    async function addUser() {
      await CrudDataService.create(data)
        .then((response) => {
          alert("User Added Successfully!");
          console.log(response.data);
          history.push("/users");
        })
        .catch(function (error) {
          console.log("error..............", error);
        });
    }
    addUser();
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
  return (
    <>
      {user.email !== "" ? (
        <div className="member-container d-flex flex-wrap">
          <div className="member-left d-lg-flex align-items-lg-center justify-content-lg-end">
            <div>
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
                        value={user.email}
                        disabled
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
                            value={firstName}
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
                            value={lastName}
                            onChange={onChangeLname}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-intro-box d-flex align-items-center">
                        <label htmlFor="password">Password</label>
                        {/* Add Framer Motion */}
                        <Container data-tip data-for="sadFace">
                          <img src={helpcircle} alt="" />
                        </Container>
                        <StyledReactTooltip id="sadFace" effect="solid">
                          <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </StyledReactTooltip>
                      </div>
                      <div className="input-group">
                        <input
                          type={passwordShown ? "text" : "password"}
                          name="your_pass"
                          id="password-field"
                          className="form-control"
                          value={password}
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
                      onClick={saveUser}
                      className="btn btn-lg btn-block submit-btn"
                    >
                      Next
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        refresh()
      )}
    </>
  );
}

export default AddUser;
