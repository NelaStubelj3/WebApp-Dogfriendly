import React from "react";
import HomeButton from "../../components/common/HomeButton";
import authService from "../../services/authService";
import ProfileUser from "../../components/ProfileUser";
import MyLocations from "../../components/MyLocations";
import ProfileBusiness from "../../components/ProfileBusiness";
import {BsFillArrowDownCircleFill} from 'react-icons/bs'
import { CSSTransition } from "react-transition-group";
import { useState } from "react";

const ProfileInfo = () => {
  const user = authService.getCurrentUser()
  const [showMyLocations, setShowMyLocations] = useState(true)

  const setEditing = (val) => {
    setShowMyLocations(prev => !val);
  }

  return (
    <div className="background4 mobile-container">
      <HomeButton/>
      <h1 className="my-profile-title">Moj profil  <BsFillArrowDownCircleFill className="arrow-icon"/></h1>
      {user.userRole === "BUSINESS" ?
        <ProfileBusiness setEditing={setEditing}/> :
        <ProfileUser setEditing={setEditing}/>
      }
      <h1 className="my-locations-title" style={{opacity: showMyLocations ? 1 : 0}}>Moje lokacije  <BsFillArrowDownCircleFill className="arrow-icon"/></h1>
      <CSSTransition in={showMyLocations} unmountOnExit timeout={500} classNames = "my-locations-anim">
        <MyLocations/>
      </CSSTransition>
    </div>
  );
};

export default ProfileInfo;
