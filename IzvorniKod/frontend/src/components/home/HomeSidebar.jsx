import React, {useContext} from 'react'
import SearchResults from './SearchResults';
import { HomeContext } from './HomeContext';
import { CSSTransition } from 'react-transition-group';
import Review from './Reviews';
import LocationInfo from '../LocationInfo';
import LocationInput from './LocationInput';

const HomeSidebar = (props) => {
  const {selectedLocation, showSidebar, searchResults} = useContext(HomeContext);
  
  return (
    <CSSTransition in={showSidebar} unmountOnExit timeout={500} classNames = "home-sidebar-anim">
      <div className="home-sidebar scrolling-container" id="sidebar">
        {searchResults.length > 0 &&
          <SearchResults/>
        }
        {selectedLocation.locationProvider && selectedLocation.locationProvider !== 'marker' &&
          <LocationInput/>
        }
        {selectedLocation.locationId &&
          <LocationInfo locationId = {selectedLocation.locationId}/>
        }
        {selectedLocation.locationId &&
          <Review/>
        }
      </div>
    </CSSTransition>
  );
};

export default HomeSidebar;
