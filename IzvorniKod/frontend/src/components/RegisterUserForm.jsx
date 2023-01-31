import React, { useState } from "react";
import Field from "./common/Field";
import Textarea from "./common/Textarea.jsx";
import authService from "../services/authService";
import { GiJumpingDog } from 'react-icons/gi'

const RegisterUserForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState(undefined);
    const [regSuccessful, setRegSuccessful] = useState(false);

    const handleClick = () => {
        authService
        .registerUser(email, password, username, firstName, lastName, bio).then((res) => {
            setRegSuccessful(true)
        }).catch((res) => {
            setError(res.response.data);
        });
    }

    return (
        <div className="register-form block">
        <div className="block-title">Registracija korisnika</div>
        {!regSuccessful &&
            <form className="block-content">
                <Field text="Ime" type="text" onChange={(e) => {setFirstName(e.target.value)}} error={firstName.length > 0 ? "" : "Ovo polje je obavezno."}/>
                <Field text="Prezime" type="text" onChange={(e) => {setLastName(e.target.value)}} error={lastName.length > 0 ? "" : "Ovo polje je obavezno."}/>
                <Field text="Korisničko Ime" type="text" onChange={(e) => {setUsername(e.target.value)}} error={username.length > 0 ? "" : "Ovo polje je obavezno."}/>
                <Field text="E-mail" type="email" onChange={(e) => {setEmail(e.target.value)}} error={email.length > 0 ? "" : "Ovo polje je obavezno."}/>
                <Field text="Lozinka" type="password" onChange={(e) => {setPassword(e.target.value)}} error={password.length >= 6 ? "" : "Lozinka mora imati barem 6 znakova."}/>
                <Textarea text="Bio" onChange={(e) => {setBio(e.target.value)}}/>

                {error && error.length > 0 &&
                    <p className="error-message">{error}</p>
                }

                <div className='button' onClick={handleClick}>Spremi</div>
            </form>
        }
        {regSuccessful &&
            <div className="block-content">
                <GiJumpingDog className="icon-giant"/>
                <h3>Registracija je uspješna! Molimo Vas da potvrdite svoj račun na mailu.</h3>
            </div>
        }
        
        </div>
    )
}

export default RegisterUserForm