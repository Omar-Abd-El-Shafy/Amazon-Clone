import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import login from "../store/actions/login";
// import signup from "../pages/Signup";
import logoMain from "../assets/imgs/logo/Amazon-logo-main.png";

export default function Login(props) {
  props.funcNav(false);
  const [emailorphone, setEmailorphone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loggedInUser = useSelector(
    (state) => state.authentication.loggedInUser
  );

  const dispatch = useDispatch();
  // useEffect(() => {
  //   const storeData = JSON.parse(localStorage.getItem("userData"));

  //   if (storeData && storeData.token) {
  //     var decoded = jwt_decode(storeData.token);
  //     console.log(decoded);
  //     dispatch(login(decoded._id, storeData.token));
  //     //navigate(`/ali/products`);
  //   }
  // }, [dispatch, navigate]);
  useEffect(() => {
    if (loggedInUser) {
      navigate(`/${loggedInUser.name}/products`);
    } else {
      console.log(loggedInUser);
    }
  }, [loggedInUser, navigate]);

  const loginn = () => {
    dispatch(login({ email: emailorphone, password }));
  };
  return (
    <div>
      <div className="mb-3 text-center">
        <a href="/">
          <img src={logoMain} alt="logo-main" style={{ width: "103px" }} />
        </a>
      </div>
      <form>
        <h2 className="mb-3 text-center">Sign-In</h2>
        <label for="name">Email or mobile phone number</label>
        <input
          type="text"
          id="name"
          placeholder=""
          value={emailorphone}
          onChange={(e) => setEmailorphone(e.target.value)}
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <input type="button" value="Login" onClick={loginn} /> */}
        <input
          type="button"
          value="Login"
          className="btn btn-warning"
          onClick={loginn}
        />
      </form>
      <div>
        <div className="new-amzn-con">
          <h5 className="new-to-amazon">New to Amazon?</h5>
        </div>
        <Link to="/signup" className="btn reg-btn d-block m-auto fw-normal">
          Create your Amazon account
        </Link>
        <Link style={{ margin: "auto" }} to="/forgot-password">
          forget Password
        </Link>
      </div>
    </div>
  );
}