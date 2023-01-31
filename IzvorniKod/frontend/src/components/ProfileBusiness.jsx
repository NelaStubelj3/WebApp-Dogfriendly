import React, {useState} from "react";
import accountService from "../services/accountService";
import Field from "./common/Field";
import Textarea from "./common/Textarea";
import {BiTrash} from 'react-icons/bi'
import {MdModeEditOutline, MdPassword} from 'react-icons/md'
import {GiSittingDog} from 'react-icons/gi'
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import businessTypeService from "../services/businessTypeService";
import Select from "./common/Select";

const ProfileBusiness = (props) => {
  const [data, setData] = useState({})
  const [editing, setEditing] = useState(false)
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(undefined);
  const [deleting, setDeleting] = useState(false);
  const [businessTypeId, setBusinessTypeId] = useState("3");
  const [businessTypes, setBusinessTypes] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editingPassword, setEditingPassword] = useState(false)
  const navigate = useNavigate()

  const getData = () => {
    accountService.getAccountDetails().then((response) => {
      setData(response.data);
      businessTypeService.getBusinessType(response.data.businessTypeId).then((res) => {
        setBusinessType(res.businessType)
      })
    });
  }

  if (editing && businessTypes.length === 0) {
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

  React.useEffect(() => {
    getData()
  }, []);

  const handleClick = () => {
    accountService.changeBusiness(businessName, null, phoneNumber, bio, businessTypeId).then((res) => {
        setEditing(false)
        props.setEditing(false)
        getData()
    }).catch((res) => {
        setError(res.response.data);
    });
  }

  return (
    <div className="block profile-info">
      <div className="block-title">
        <h3>{data.businessName}</h3>
        <span className="edit-icons">
          <BiTrash onClick={() => {if(!editing && !editingPassword) setDeleting(true)}}/>
          <MdPassword onClick={() => {if(!editing && !deleting) setEditingPassword(true)}}/>
          <MdModeEditOutline onClick={() => {
            if(!deleting && !editingPassword){
              setEditing(true)
              props.setEditing(true)
              setBusinessName(data.businessName)
              setPhoneNumber(data.phoneNumber)
              setBusinessTypeId(data.businessTypeId)
              setBio(data.bio)
            }
          }}/>
        </span>
      </div>
      {!editing && !deleting && !editingPassword &&
         <div className="block-content">
          <p><b>E pošta:</b> {data.email}</p>
          <p><b>OIB:</b> {data.oib}</p>
          <p><b>Vrsta obrta:</b> {businessType}</p>
          <p><b>Broj telefona:</b> {data.phoneNumber}</p>
          <p><b>Bio:</b> {data.bio}</p>
        </div>
      }
      {!deleting && editing &&
        <div className="block-content">
          <Field value={businessName} text="Ime Obrta" type="text" onChange={(e) => {setBusinessName(e.target.value)}} error={businessName.length > 0 ? "" : "Ovo polje je obavezno."}/>
          <Field value={phoneNumber} text="Broj telefona" type="number" onChange={(e) => {setPhoneNumber(e.target.value)}} error={phoneNumber.length > 0 ? "" : "Ovo polje je obavezno."}/>
          <Select text="Tip obrta" selected={businessTypeId} options={businessTypes} onChange={(e) => {setBusinessTypeId(e.target.value)}}/>
          <Textarea value={bio} text="Bio" onChange={(e) => {setBio(e.target.value)}}/>

          {error && error.length > 0 &&
              <p className="error-message">{error}</p>
          }
          <span className="row-container">
            <div className='button' onClick={() => {props.setEditing(false); setEditing(false)}}>Natrag</div>
            {<div className='button' onClick={handleClick}>Spremi</div>}
          </span>

          
        </div>
      }
      {deleting &&
        <div className="block-content">
          <GiSittingDog className="icon-medium"/>
          <h1>Jeste li sigurni da želite obrisati račun?</h1>

          <span className="row-container">
            <div className='button' onClick={() => {setDeleting(false)}}>Natrag</div>
            <div className='button' onClick={() => {
              accountService.deleteAccount()
              authService.logout()
              navigate('/')
            }}>Izbriši</div>
          </span>
        </div>
      }
      {editingPassword &&
         <div className="block-content">
          <Field value={data.password} text="Lozinka" type="password" onChange={(e) => {setPassword(e.target.value)}} error={password.length >= 6 ? "" : "Lozinka mora imati barem 6 znakova."}/>

          {error && error.length > 0 &&
              <p className="error-message">{error}</p>
          }
          <span className="row-container">
            <div className='button' onClick={() => {setEditingPassword(false)}}>Natrag</div>
            <div className='button' onClick={() => {
              accountService.changeBusiness(null, password, null, null, null).then((res) => {
                  setEditingPassword(false)
              }).catch((res) => {
                  setError(res.response.data);
              });
            }}>Spremi</div>
          </span>

          
        </div>
      
      }
        
    </div>
  );
};

export default ProfileBusiness;
