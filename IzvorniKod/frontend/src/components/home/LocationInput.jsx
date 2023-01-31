import React, { useState, useContext, useEffect } from "react";
import Field from "../common/Field";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import locationTypeService from "../../services/locationTypeService";
import Checkbox from "../common/Checkbox";
import authService from "../../services/authService";
import locationService from "../../services/locationService";
import { HomeContext } from "./HomeContext";
import mapboxService from "../../services/mapboxService";


const LocationInput = () => {
	const [addingLocation, setAddingLocation] = useState(false);
	const [locationName, setLocationName] = useState("");
	const [address, setAddress] = useState("");
	const [locationDescription, setLocationDescription] = useState("");
	const [locationTypes, setLocationTypes] = useState([]);
	const [locationTypeId, setLocationTypeId] = useState("1");
	const [promoted, setPromoted] = useState(false);
    const [dogFriendly, setDogFriendly] = useState(false);
	const [error, setError] = useState(undefined);

	const {selectedLocation} = useContext(HomeContext);
	const user = authService.getCurrentUser()

	if (locationTypes.length === 0) {
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
		locationService.addLocation(selectedLocation.lng, selectedLocation.lat, locationName, locationDescription, promoted, dogFriendly, user.accountId, locationTypeId, address).then((res) => {
			setAddingLocation(false)
			window.map.removeDraggable()
			window.map.addLocationMarker({
				locationTypeId: Number(locationTypeId),
				locationId: res.data,
				longitude: selectedLocation.lng,
				latitude: selectedLocation.lat,
				locationName: locationName,
				locationDescription: locationDescription,
				promoted: promoted, 
				dogFriendly: dogFriendly,
				accountId: user.accountId,
				address: address,
				starAverage: 0
			})
		}).catch((res) => {
			setError(res.response.data);
		})
	}

	useEffect(() => {
		mapboxService.getAddress(selectedLocation.lng, selectedLocation.lat).then((res) => {
			setAddress(res)
		})
	}, [selectedLocation]);

	

	if(!user) {
		return (
			<div className="sidebar-block">
				<div className="sidebar-block-title">Potrebno se prijaviti za unos lokacije</div>
			</div>
		)
	}

	if(addingLocation) {
		return (
			<div className="sidebar-block">
				<div className="sidebar-block-title"><h3>Nova Lokacija</h3></div>
				<form className="block-content">
					<Field text="Naziv lokacije" type="text" onChange={(e) => {setLocationName(e.target.value)}} error={locationName.length > 0 ? "" : "Ovo polje je obavezno."}/>
					<Field value={address} text="Adresa" type="text" onChange={(e) => {setAddress(e.target.value)}} error={address.length > 0 ? "" : "Ovo polje je obavezno."}/>
					<Select text="Vrsta lokacije" selected={locationTypeId} options={locationTypes} onChange={(e) => {setLocationTypeId(e.target.value)}}/>
					{user.userRole === "BUSINESS" &&
						<Checkbox text="Promovirana" checked={false} onChange={(e) => {setPromoted(e.target.checked)}}/>
					}
					<Checkbox text="Prikladno za pse" checked={false} onChange={(e) => {setDogFriendly(e.target.checked)}}/>
					<Textarea text="Opis lokacije" onChange={(e) => {setLocationDescription(e.target.value)}}/>

					{error && error.length > 0 &&
                        <p className="error-message">{error}</p>
                    }
					<div className='button' onClick={handleSubmit}>Dodaj</div>
				</form>
			</div>
		)
	} else {
		return (
			<div className="sidebar-block">
				<div className="sidebar-button" onClick={() => {setAddingLocation(!addingLocation)}}>Dodaj lokaciju</div>
			</div>
		)
	}
}

export default LocationInput;