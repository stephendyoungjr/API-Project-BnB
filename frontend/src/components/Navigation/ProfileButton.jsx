import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

// Local Imports
import { logout } from "../../store/session";
import OpenModalMenuItem from './OpenModalMenuItem'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";


const ProfileButton = ({user}) => {
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu)
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const closeMenu = () => setShowMenu(false);

    const logoutClick = (e) => {
        e.preventDefault();
        dispatch(logout())
        closeMenu()
        navigate('/')
    };

    const dropdownClasses ="profile-dropdown" + (showMenu ? "" : " hidden");
    return (
    <div>
    <button id="toggle-menu-button"
        onClick={toggleMenu}
    >
        <IoMenu />
        <FaCircleUser />
    </button>
    <ul className={dropdownClasses} ref={ulRef}>
        {user ? (
            <>
                <li>Hello, {user.firstName}</li>
                <li>{user.email}</li>
                <hr></hr>
                <li onClick={()=> navigate('/spots/current')}>Manage Spots</li>
                <hr></hr>
                <li id="logout">
                    <button onClick={logoutClick}>Log Out</button>
                </li>
            </>
        ) : (
            <>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </>
        )}
    </ul>
    </div>
 )
}

export default ProfileButton;

// import { useEffect, useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { FaCircleUser } from "react-icons/fa6";
// import { IoMenu } from "react-icons/io5";
// import React from "react";
// import { logout } from "../../store/session";
// import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
// import { useNavigate } from "react-router-dom";

// const ProfileButton = ({ user }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef();

//     // Function to toggle the dropdown menu
//     const toggleMenu = (e) => {
//         e.stopPropagation();
//         setShowMenu((prevShowMenu) => !prevShowMenu);
//         console.log("Dropdown menu toggled:", !showMenu); 
//     };

//     // Effect to close the dropdown menu when clicking outside of it
//     useEffect(() => {
//         if (!showMenu) return;

//         const closeMenu = (e) => {
//             if (ulRef.current && !ulRef.current.contains(e.target)) {
//                 setShowMenu(false);
//                 console.log("Dropdown menu closed due to outside click");
//             }
//         };

//         document.addEventListener("click", closeMenu);

//         return () => {
//             document.removeEventListener("click", closeMenu);
//         };
//     }, [showMenu]);

//     // Function to close the menu
//     const closeMenu = () => {
//         setShowMenu(false);
//         console.log("Dropdown menu manually closed");
//     };

//     // Function to handle logout
//     const logoutClick = (e) => {
//         e.preventDefault();
//         dispatch(logout());
//         closeMenu();
//         navigate("/");
//         console.log("User logged out");
//     };

//     // Determine dropdown class based on whether the menu should be shown
//     const dropdownClasses = `profile-dropdown ${showMenu ? "" : "hidden"}`;

//     return (
//         <div>
//             <button id="toggle-menu-button" onClick={toggleMenu}>
//                 <IoMenu />
//                 <FaCircleUser />
//             </button>
//             <ul className={dropdownClasses} ref={ulRef}>
//                 {user ? (
//                     <>
//                         <li>Hello, {user.firstName}</li>
//                         <li>{user.email}</li>
//                         <hr />
//                         <li onClick={() => navigate("/spots/current")}>
//                             Manage Spots
//                         </li>
//                         <hr />
//                         <li id="logout">
//                             <button onClick={logoutClick}>Log Out</button>
//                         </li>
//                     </>
//                 ) : (
//                     <>
//                         <OpenModalMenuItem
//                             itemText="Sign Up"
//                             modalComponent={<SignupFormModal />}
//                         />
//                         <OpenModalMenuItem
//                             itemText="Log In"
//                             modalComponent={<LoginFormModal />}
//                         />
//                     </>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default ProfileButton;


