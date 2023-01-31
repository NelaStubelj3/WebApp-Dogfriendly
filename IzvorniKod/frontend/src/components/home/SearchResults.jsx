import React, {useContext} from 'react'
import { HomeContext } from './HomeContext';

const SearchResults = () => {
  const {searchResults} = useContext(HomeContext);

  return (
    <div className="sidebar-block">
      <div className='sidebar-block-title'>
        <h3>Rezultati pretraživanja</h3>
      </div>
      <div className='sidebar-block-content search-results'>
        <ul>
            {searchResults}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
