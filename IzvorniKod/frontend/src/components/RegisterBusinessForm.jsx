import React, { useState } from "react";
import Field from "./common/Field";
import Textarea from "./common/Textarea.jsx";
import authService from "../services/authService";
import { GiJumpingDog } from 'react-icons/gi'
import businessTypeService from "../services/businessTypeService";
import Select from "./common/Select";
import CreditCardForm from "./common/CreditCardForm";

const RegisterBusinessForm = () => {
    const [businessTypes, setBusinessTypes] = useState([]);
    const [businessName, setBusinessName] = useState("");
    const [oib, setOib] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [bio, setBio] = useState("");
    const [businessTypeId, setBusinessTypeId] = useState("3");

    const [error, setError] = useState(undefined);
    const [regStage, setRegStage] = useState(0);

    const handleClick = () => {
        authService.registerBusiness(email, password, businessName, oib, phoneNumber, businessTypeId, bio).then(() => {
            setRegStage(1);
        }).catch((res) => {
        setError(res.response.data);
        });
    
    }

    if (businessTypes.length === 0) {
        businessTypeService.getAllBusinessType().then((res) => {
          let businessTypeOptions = [];
          for (let bt of res) {
            businessTypeOptions.push(
              <option key={bt["businessTypeId"]} value={bt["businessTypeId"]}>
                {bt["businessType"]}
              </option>
            );
          }
          setBusinessTypes(businessTypeOptions);
        });
    }
    

    return (
        <div className="register-form block">
            <div className="block-title">Registracija obrta</div>
            {regStage === 0 &&
                <form className="block-content">
                    <Field text="Ime Obrta" type="text" onChange={(e) => {setBusinessName(e.target.value)}} error={businessName.length > 0 ? "" : "Ovo polje je obavezno."}/>
                    <Field text="Oib" type="number" onChange={(e) => {setOib(e.target.value)}} error={oib.length === 11 ? "" : "Oib mora sadržavati 11 znakova."}/>
                    <Field text="Broj telefona" type="number" onChange={(e) => {setPhoneNumber(e.target.value)}} error={phoneNumber.length > 0 ? "" : "Ovo polje je obavezno."}/>
                    <Select text="Tip obrta" selected={businessTypeId} options={businessTypes} onChange={(e) => {setBusinessTypeId(e.target.value)}}/>
                    <Field text="E-mail" type="email" onChange={(e) => {setEmail(e.target.value)}} error={email.length > 0 ? "" : "Ovo polje je obavezno."}/>
                    <Field text="Lozinka" type="password" onChange={(e) => {setPassword(e.target.value)}} error={password.length >= 6 ? "" : "Lozinka mora imati barem 6 znakova."}/>
                    <Textarea text="Bio" onChange={(e) => {setBio(e.target.value)}}/>

                    {error && error.length > 0 &&
                        <p className="error-message">{error}</p>
                    }

                    <div className='button' onClick={handleClick}>Dalje</div>
                </form>
            }
            {regStage === 1 &&
                <div className="block-content">
                    <CreditCardForm/>
                    <div className='button' onClick={() => {setRegStage(2)}}>Spremi</div>
                </div>
            }
            {regStage === 2 &&
                <div className="block-content">
                    <GiJumpingDog className="icon-giant"/>
                    <h3>Registracija je uspješna! Molimo Vas da potvrdite svoj račun na mailu.</h3>
                </div>
            }
        </div>
    )
}

export default RegisterBusinessForm