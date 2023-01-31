import React from "react";
import HomeButton from '../../components/common/HomeButton'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()

  const handleClick = (event) => {
    navigate('/register/' + event.target.id)
  }

  return (
    <div className="register-container mobile-container">
      <HomeButton/>
      <div className="register-option1 register-option">
        <div id="business" className="overlay" onClick={handleClick}></div>
        <h1 id="business" onClick={handleClick}>Registracija obrta</h1>
      </div>
      <div className="register-option2 register-option">
        <div id="user" className="overlay" onClick={handleClick}></div>
        <h1 id="user" onClick={handleClick}>Registracija korisnika</h1>
      </div>
    </div>
  );
};

export default Register;
