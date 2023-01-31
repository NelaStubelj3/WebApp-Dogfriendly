import React, { useState } from "react";

import Field from "./common/Field";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  let email, password;
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleClick = () => {
    authService
      .login(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((res) => {
        setError(true);
      });
  }

  return (
    <div className="login-form block">
      <div className="block-title">Prijava korisnika</div>
      <form className="block-content">
        <Field id="inputEmail" text="E-mail" type="email" onChange={(e) => { email = e.target.value }}/>
        <Field id="inputPassword" text="Lozinka" type="password" onChange={(e) => { password = e.target.value }}/>
        {error && (
          <div>
            <p style={{ color: "red", fontSize: "15px", margin: "3px" }}>
              Pogrešan e-mail ili lozinka
            </p>
          </div>
        )}
        <div className='button' onClick={handleClick}>Prijava</div>
      </form>
    </div>
  );
};

export default LoginForm;
