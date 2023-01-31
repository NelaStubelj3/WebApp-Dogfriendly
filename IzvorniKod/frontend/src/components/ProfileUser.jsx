import React, {useState} from "react";
import accountService from "../services/accountService";
import Field from "./common/Field";
import Textarea from "./common/Textarea";
import {BiTrash} from 'react-icons/bi'
import {MdModeEditOutline, MdPassword} from 'react-icons/md'
import {GiSittingDog} from 'react-icons/gi'
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const ProfileUser = (props) => {
  const [data, setData] = useState({})
  const [editing, setEditing] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(undefined);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate()

  const getData = () => {
    accountService.getAccountDetails().then((response) => {
      setData(response.data);
    });
  }

  React.useEffect(() => {
    getData()
  }, []);

  const handleClick = () => {
    accountService.changeUser(null, null, username, null, bio).then((res) => {
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
        <h3>{data.firstName} {data.lastName}</h3>
        <span className="edit-icons">
          <BiTrash onClick={() => {if(!editing && !editingPassword) setDeleting(true)}}/>
          <MdPassword onClick={() => {if(!editing && !deleting) setEditingPassword(true)}}/>
          <MdModeEditOutline onClick={() => {if(!deleting && !editingPassword){props.setEditing(true); setEditing(true)}}}/>
        </span>
      </div>
      {!editing && !deleting && !editingPassword &&
         <div className="block-content">
          <p name="username"><b>Korisničko ime:</b> {data.username}</p>
          <p name="email"><b>E-mail:</b> {data.email}</p>
          <p name="bio"><b>Bio:</b> {data.bio}</p>
        </div>
      }
      {!deleting && editing &&
        <div className="block-content">
          <Field value={data.username} text="Korisničko Ime" type="text" onChange={(e) => {setUsername(e.target.value)}} error={username.length > 0 ? "" : "Ovo polje je obavezno."}/>
          <Textarea value={data.bio} text="Bio" onChange={(e) => {setBio(e.target.value)}}/>

          {error && error.length > 0 &&
              <p className="error-message">{error}</p>
          }
          <span className="row-container">
            <div className='button' onClick={() => {props.setEditing(false); setEditing(false)}}>Natrag</div>
            <div id="saveChanges" className='button' onClick={handleClick}>Spremi</div>
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
              accountService.changeUser(null, null, null, password, null).then((res) => {
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

export default ProfileUser;
