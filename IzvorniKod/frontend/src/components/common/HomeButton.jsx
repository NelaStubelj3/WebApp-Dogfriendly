import React from 'react'
import { GiDogHouse } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate()

  return (
    <div className='home-button button-circle' onClick={() => { navigate('/') }}>
        <GiDogHouse/>
    </div>
  );
};

export default HomeButton;
