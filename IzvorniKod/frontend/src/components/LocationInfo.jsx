import React from "react";

import { useState } from "react";
import locationService from "../services/locationService";
import ReactStars from "react-stars";
import { RiAdvertisementLine } from 'react-icons/ri'
import { GiSittingDog } from 'react-icons/gi'
import { MdLocationOn } from 'react-icons/md'
import {BiTrash} from 'react-icons/bi'
import {MdModeEditOutline} from 'react-icons/md'
import authService from "../services/authService";
import locationTypeService from "../services/locationTypeService";

import Field from "./common/Field";
import Textarea from "./common/Textarea";
import Select from "./common/Select";
import Checkbox from "./common/Checkbox";

const LocationInfo = (props) => {
 
  const [data, setData] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

	const [locationName, setLocationName] = useState("");
	const [locationDescription, setLocationDescription] = useState("");
	const [locationTypes, setLocationTypes] = useState([]);
	const [locationTypeId, setLocationTypeId] = useState("1");
	const [promoted, setPromoted] = useState(false);
  const [dogFriendly, setDogFriendly] = useState(true);
	const [error, setError] = useState(undefined);

  if (editing && locationTypes.length === 0) {
    locationTypeService.getLocationTypes().then((res) => {
      let locationTypeOptions = [];
      for (let lt of res.data) {
        locationTypeOptions.push(
          <option key={lt["locationTypeId"]} value={lt["locationTypeId"]}>
            {lt["locationType"]}
          </option>
        );
      }
      setLocationTypes(locationTypeOptions);
    });
  }

  const handleSubmit = () => {
    locationService.changeLocation(data.locationId, locationName, locationTypeId, dogFriendly, promoted, locationDescription).then(() => {
      setEditing(false)
      setData(data => ({...data,
        locationName: locationName,
        locationTypeId: locationTypeId,
        dogFriendly: dogFriendly,
        promoted: promoted,
        locationDescription: locationDescription 
      }))
    }).catch((res) => {
      setError(res.response.data)
    })
  }

  React.useEffect(() => {
    if(props.location){
      setData(props.location)
      locationService.getLocationType(props.location.locationTypeId).then((res) => {
        setLocationType(res.locationType); 
      });
    }
    else {
      locationService.getLocation(props.locationId).then((response) => {
        setData(response);
        locationService.getLocationType(response.locationTypeId).then((res) => {
          setLocationType(res.locationType); 
        });
      });
    }
  }, [props]);
  
  if (!data) return null;

  return (
    
    <div className='sidebar-block'>
      <div className={props.className + " sidebar-block-title inline"}>
        <h3>{data.locationName}</h3>
        {data.promoted === true && <RiAdvertisementLine className="ad-icon"/>}
        {props.displayEditOptions &&
          <span className="edit-location-icons">
            <BiTrash onClick={() => {if(!editing) setDeleting(true)}}/>
            <MdModeEditOutline onClick={() => {
              if(!deleting){
                setEditing(true)
                setLocationName(data.locationName)
                setLocationTypeId(data.locationTypeId)
                setDogFriendly(data.dogFriendly)
                setPromoted(data.promoted)
                setLocationDescription(data.locationDescription)
              }
              
            }
            }/>
          </span>
        }
      </div>
      {!deleting && !editing &&
        <div className="sidebar-block-content vertical-center">
          <ReactStars
              count={5} 
              value={data.starAverage}
              size={24} 
              color2={'orange'} 
              edit={false}/>
          <p><b>Vrsta lokacije:</b> {locationType}</p>
          <span className="inline">
            <MdLocationOn className="location-info-icon"/>     
            <p>{data.address}</p>
          </span>
          <span className="inline">
            <GiSittingDog className="location-info-icon" style={{color: data.dogFriendly ? "green" : "red"}}/>
            <p>{data.dogFriendly === true ? "Lokacija je prikladna za pse :)" : "Lokacija nije prikladna za pse!"}</p>
          </span>
          <p><b>Opis:</b> {data.locationDescription}</p>
        </div> 
      }
      {deleting &&
        <div className="sidebar-block-content vertical-center">
          <BiTrash className="icon-medium"/>
          <h3>Jeste li sigurni da želite obrisati račun?</h3>

          <span className="row-container">
            <div className='button' onClick={() => {setDeleting(false)}}>Natrag</div>
            <div className='button' onClick={() => {
              locationService.deleteLocation(props.location.locationId)
              props.onDelete(props.id)
            }}>Izbriši</div>
          </span>
        </div>
      }
      {editing &&
        <form className="block-content">
          <Field value={locationName} text="Naziv lokacije" type="text" onChange={(e) => {setLocationName(e.target.value)}} error={locationName.length > 0 ? "" : "Ovo polje je obavezno."}/>
          <Select text="Vrsta lokacije" selected={locationTypeId} options={locationTypes} onChange={(e) => {setLocationTypeId(e.target.value)}}/>
          <span className="row-container">
            {authService.getCurrentUser().userRole === "BUSINESS" &&
              <Checkbox checked={promoted} text="Promovirana" onChange={(e) => {setPromoted(e.target.checked)}}/>
            }
            <Checkbox text="Prikladno za pse" checked={dogFriendly} onChange={(e) => {setDogFriendly(e.target.checked)}}/>
          </span>
          <Textarea value={locationDescription} text="Opis lokacije" onChange={(e) => {setLocationDescription(e.target.value)}}/>

          {error && error.length > 0 &&
                        <p className="error-message">{error}</p>
                    }
          <span className="row-container">
            <div className='button' onClick={() => {setEditing(false)}}>Natrag</div>
            <div className='button' onClick={handleSubmit}>Spremi</div>
          </span>
        </form>
      }
          
    </div>
  );
  
};

export default LocationInfo;
