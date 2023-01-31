import React from "react";
import HomeButton from "../../components/common/HomeButton";
import RegisterUserForm from "../../components/RegisterUserForm"

const RegisterUser = () => {
  return (
    <div className="background1 mobile-container">
      <HomeButton/>
      <RegisterUserForm/>
    </div>
  );
};

export default RegisterUser;
