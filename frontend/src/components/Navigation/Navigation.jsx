import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import './Navigation.css';
import warbnbLogo from '../../../public/warbnblogo.jpeg'


const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user)
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/spots/new')
    }

    return (
        <nav>
        <ul>
            <li id="home-nav">
                <NavLink to="/">
                <img src={warbnbLogo} alt="Warbnb Logo" style={{ width: '50px', height: '50px' }} />
                    Warbnb
                </NavLink>
            </li>
            {isLoaded && (
                <div id="user-nav">
                <li className={sessionUser? '': 'hide'} onClick={handleClick}>Create a New Spot</li>
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
                </div>
            )}
        </ul>
        </nav>
    )
};

export default Navigation;

