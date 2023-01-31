import React, {createContext, useState} from 'react'

import HomeSidebar from '../../components/home/HomeSidebar';
import Map from '../../components/home/Map';
import SearchBar from '../../components/home/SearchBar';
import { HomeContext } from '../../components/home/HomeContext';
import AccountInfo from '../../components/home/AccountInfo';
import ToggleSidebarButton from '../../components/home/ToggleSidebarButton';
import LocationFilter from '../../components/home/LocationFilter';

//[15.971116,45.8]

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState({lng: 15.971116, lat: 45.8, locationId: undefined, locationProvider: undefined});
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [locationFilter, setLocationFilter] = useState({show: false, selected: new Set()});

  return (
    <HomeContext.Provider value={{selectedLocation, setSelectedLocation, showSidebar, setShowSidebar, searchResults, setSearchResults, locationFilter, setLocationFilter}}>
      <Map/>
      <SearchBar/>
      <HomeSidebar/>
      <ToggleSidebarButton/>
      <AccountInfo/>
      <LocationFilter/>
    </HomeContext.Provider>
  );
};

export default Index;
