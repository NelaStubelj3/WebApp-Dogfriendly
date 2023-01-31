import React from "react";
import LoginForm from "../../components/LoginForm";
import HomeButton from "../../components/common/HomeButton";

const Login = () => {
  return (
    <div className="background1 mobile-container">
      <HomeButton/>
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;
