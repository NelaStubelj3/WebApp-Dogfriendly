import React, {useContext} from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { HomeContext } from "./HomeContext";
import { CSSTransition } from "react-transition-group";

const ToggleSidebarButton = () => {
    const {showSidebar, setShowSidebar} = useContext(HomeContext);


    return (
        <CSSTransition in={showSidebar} timeout={500} classNames = "toggle-sidebar-anim" onExited={() => {
            document.getElementById("toggle-sidebar").style.left = "30px"
            
        }} onEntered = {() => {
            document.getElementById("toggle-sidebar").style.left = "calc( min(73%, 500px) + 50px)"
        }} onEnter = {() => {
            document.getElementById("toggle-sidebar").style = null
        }} onExit = {() => {
            document.getElementById("toggle-sidebar").style = null
        }}>
            <div id="toggle-sidebar" className="toggle-sidebar" onClick={() => {setShowSidebar(!showSidebar)}}>
                {showSidebar ? <AiOutlineArrowLeft/> : <AiOutlineArrowRight/>}
            </div>
        </CSSTransition>
    )
}

export default ToggleSidebarButton;