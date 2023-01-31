import React, {useState, useEffect} from "react";
import { useCallback } from "react";
import authService from "../services/authService";
import locationService from "../services/locationService";
import LocationInfo from "./LocationInfo";
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

const MyLocations = () => {
    const [locations, setLocations] = useState([]);
    const user = authService.getCurrentUser();
    const navigate = useNavigate()

    const onDelete = (ind) => {
        setLocations(prevLocations => prevLocations.filter((location) => {return Number(location.key) !== Number(ind)}))
    }

    const getLocations = () => {
        locationService.getLocationsForAccount(user.accountId).then((res) => {
            let tmp = []
            let i = 0
            res.data.forEach((location) => {
                tmp.push(<LocationInfo id={i} location={location} key={i} displayEditOptions onDelete={onDelete}/>);
                i++;
            })

            
            tmp.push(
            <div className='sidebar-block'>
                <div className="add-more-locations" onClick={() => {navigate('/')}}>
                    <AiOutlinePlusCircle className="icon-medium"/>  
                    <h1>Dodaj lokacije<br/> na karti</h1>  
                </div>
            </div>)
            
            setLocations(tmp);
        })
    }

    useEffect(() => {
        getLocations()
    }, []);

    return (
        <span id="my-locations" className="my-locations scrolling-container" onWheel={(e) => {
            let el = document.getElementById("my-locations")
            el.scrollTo({
                left: el.scrollLeft + 10 * e.deltaY,
                behavior: "smooth"
              });
        }}>
            {locations}
        </span>
    )
}

export default MyLocations