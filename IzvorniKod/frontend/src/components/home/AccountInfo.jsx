import React, {useState} from "react";
import { AiOutlineUser } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { CSSTransition } from 'react-transition-group'
import authService from "../../services/authService";

const AccountInfo = () => {
    const [showMore, setShowMore] = useState(false)
    const navigate = useNavigate()
    
    const onAccountCircleMouseEnter = () => {
        setShowMore(true)
    }

    const onAccountInfoMouseLeave = () => {
        setShowMore(false)
    }

    const user = authService.getCurrentUser()
    let buttons = [];
    if(!user) {
        buttons = [
            <div id="login" key={0} className="account-button" onClick={() => { navigate('/login') }}>Prijavi se</div>,
            <div key={1} className="account-button" onClick={() => { navigate('/register') }}>Stvori račun</div>
        ]
    } else {
        buttons = [
            <div id="profileInfo" key={0} className="account-button" onClick={() => { navigate('/profile') }}>Profil</div>,
            <div key={1} className="account-button" onClick={() => { 
                authService.logout()
                navigate('/')
                window.location.reload(false) 
            }}>Odjavi se</div>
        ]
    }

    return (
        <div id="account-info" className="account-info" onMouseLeave={onAccountInfoMouseLeave}>
            <div className="button-circle account-circle">
                <AiOutlineUser onMouseEnter={onAccountCircleMouseEnter}/>
            </div>
            <CSSTransition in={showMore} unmountOnExit timeout={500} classNames = "more-account-options-anim">
                <div className="more-account-options">
                    {buttons}
                </div>
            </CSSTransition>
        </div>
    )
}

export default AccountInfo