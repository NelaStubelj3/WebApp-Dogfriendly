import React, {useContext} from "react";
import locationService from "../../services/locationService";
import mapboxService from "../../services/mapboxService";
import { HomeContext } from "./HomeContext";

const SearchBar = () => {
  let resultCoordinates = []
  const {selectedLocation, setSelectedLocation, setShowSidebar, setSearchResults} = useContext(HomeContext);

  const onSearchResultClick = (event) => {
    setSelectedLocation({
      lng: resultCoordinates[event.target.id][0],
      lat: resultCoordinates[event.target.id][1],
      locationId: event.target.getAttribute("location-id"),
      locationProvider: event.target.getAttribute("location-id") ? "marker" : "search"
    })
    window.map.flyToLocation(resultCoordinates[event.target.id])
    window.map.addDraggable([resultCoordinates[event.target.id][0], resultCoordinates[event.target.id][1]])
  }


  const onSearch = (inp) => {
    setShowSidebar(true)

    Promise.all([locationService.search(inp.target.value), mapboxService.getSearchResults(inp.target.value)]).then((res) => {
      resultCoordinates = []
      let tmp = []
      
      for(let i in res[0].data) {
        tmp.push( <li id={i} key={i} onClick={onSearchResultClick} location-id={res[0].data[i].locationId}>{res[0].data[i].locationName}</li> );
        resultCoordinates.push([res[0].data[i].longitude, res[0].data[i].latitude])
      }

      for(let i in res[1].data.features) {
        tmp.push( <li id={Number(i) + res[0].data.length} key={Number(i) + res[0].data.length} onClick={onSearchResultClick}>{res[1].data.features[i].place_name}</li> );
        resultCoordinates.push(res[1].data.features[i].center)
      }
      setSearchResults(tmp);
    });

  }

  return (
    <input className="input" type="search" id="search" placeholder="Pretraži lokacije" onChange={onSearch} onClick={() => {setShowSidebar(true)}}/>
  );
};

export default SearchBar;
