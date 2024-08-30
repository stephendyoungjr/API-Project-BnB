import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import React from 'react';

import { logout } from "../../store/session";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal'; 
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

const ProfileButton = ({user}) => {
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef(); // Ref for the dropdown menu

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu); // Toggle the menu visibility
    };

    useEffect(() => {
        if (!showMenu) return; // If the menu is not shown, do nothing

        // Function to close the menu if a click is detected outside of it
        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false); // Close the menu
            }
        };

        document.addEventListener('click', closeMenu);

        // Cleanup the event listener when the component is unmounted or the menu is closed
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logoutClick = (e) => {
        e.preventDefault();
        dispatch(logout());
        closeMenu();
        navigate('/');
    };

    const dropdownClasses = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div>
            <button id="toggle-menu-button" onClick={toggleMenu}>
                <IoMenu />
                <FaCircleUser />
            </button>
            <ul className={dropdownClasses} ref={ulRef}> {/* Attach the ref to the dropdown menu */}
                {user ? (
                    <>
                        <li>Hello, {user.firstName}</li>
                        <li>{user.email}</li>
                        <hr></hr>
                        <li onClick={() => navigate('/spots/current')}>Manage Spots</li>
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
    );
}

export default ProfileButton;






// 

// import { useDispatch } from "react-redux";
// import { FaCircleUser } from "react-icons/fa6";
// import { IoMenu } from "react-icons/io5";
// import React from 'react';


// // Local Imports
// import { logout } from "../../store/session";
// import OpenModalMenuItem from './OpenModalMenuItem'
// import LoginFormModal from '../LoginFormModal'; 
// import SignupFormModal from "../SignupFormModal";
// import { useNavigate } from "react-router-dom";


// const ProfileButton = ({user}) => {
//     const dispatch =  useDispatch();
//     const navigate = useNavigate();
//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef()

//     const toggleMenu = (e) => {
//         e.stopPropagation();
//         setShowMenu(!showMenu)
//     };

//     useEffect(() => {
//         if(!showMenu) return;

//         const closeMenu = (e) => {
//             if (!ulRef.current.contains(e.target)) {
//                 setShowMenu(false);
//             }
//         }

//         document.addEventListener('click', closeMenu);

//         return () => document.removeEventListener('click', closeMenu)
//     }, [showMenu])

//     const closeMenu = () => setShowMenu(false);

//     const logoutClick = (e) => {
//         e.preventDefault();
//         dispatch(logout())
//         closeMenu()
//         navigate('/')
//     };

//     const dropdownClasses ="profile-dropdown" + (showMenu ? "" : " hidden");
//     return (
//     <div>
//     <button id="toggle-menu-button"
//         onClick={toggleMenu}
//     >
//         <IoMenu />
//         <FaCircleUser />
//     </button>
//     <ul className={dropdownClasses} ref={ulRef}>
//         {user ? (
//             <>
//                 <li>Hello, {user.firstName}</li>
//                 <li>{user.email}</li>
//                 <hr></hr>
//                 <li onClick={()=> navigate('/spots/current')}>Manage Spots</li>
//                 <hr></hr>
//                 <li id="logout">
//                     <button onClick={logoutClick}>Log Out</button>
//                 </li>
//             </>
//         ) : (
//             <>
//               <OpenModalMenuItem
//                 itemText="Sign Up"
//                 onItemClick={closeMenu}
//                 modalComponent={<SignupFormModal />}
//               />
//               <OpenModalMenuItem
//                 itemText="Log In"
//                 onItemClick={closeMenu}
//                 modalComponent={<LoginFormModal />}
//               />
//             </>
//         )}
//     </ul>
//     </div>
//  )
// }

// export default ProfileButton;