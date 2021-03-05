import React from "react";
import "./Login.css";
import logo from "../Asset/discord-logo.png";
import { auth, provider } from "../firebase";

//
import { Button } from "@material-ui/core";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => {
      alert(err.message);
    });
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img src={logo} alt="discord" />
        <Button onClick={signIn}>Sign In</Button>
      </div>
    </div>
  );
}

export default Login;
