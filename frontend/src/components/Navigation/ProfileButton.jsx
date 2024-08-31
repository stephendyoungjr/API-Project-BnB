
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../store/session";
import "./Navigation";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { useNavigate } from "react-router-dom";

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

  const logout = () => {
    dispatch(sessionActions.logout());
    setShowMenu(false);
    navigate("/");
  };

  const handleManageSpotClick = () => {
    navigate("/manage-spots");
  };

  return (
    <>
      <button onClick={toggleMenu} className="icon">
        <ThreeBar /> <Profile />
      </button>

      <div
        className={`profile-dropdown ${showMenu ? "" : "hidden"}`}
        ref={ulRef}
      >
        {user ? (
          <>
            <div className="profile-top">Hello,{user.firstName}</div>
            <div className="profile-top">{user.email}</div>

            <div onClick={handleManageSpotClick} className="profile-home">
              Manage Spots
            </div>

            <div className="profile-home">
              <OpenModalMenuItem itemText="Log Out" onItemClick={logout} />
            </div>
          </>
        ) : (
          <>
            <div className="profile-home">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={() => setShowMenu(false)}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="profile-home">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={() => setShowMenu(false)}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;

// import { useEffect, useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { FaCircleUser } from "react-icons/fa6";
// import { IoMenu } from "react-icons/io5";
// import React from 'react';
// import { logout } from "../../store/session";
// import OpenModalMenuItem from './OpenModalMenuItem';
// import LoginFormModal from '../LoginFormModal'; 
// import SignupFormModal from "../SignupFormModal";
// import { useNavigate } from "react-router-dom";

// const ProfileButton = ({ user }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef(); // Ref for the dropdown menu

//     const toggleMenu = (e) => {
//         e.stopPropagation();
//         setShowMenu(!showMenu); // Toggle the menu visibility
//         console.log("Menu toggled, showMenu:", !showMenu);
//     };

//     useEffect(() => {
//         if (!showMenu) return; // If the menu is not shown, do nothing

//         const closeMenu = (e) => {
//             if (ulRef.current && !ulRef.current.contains(e.target)) {
//                 setShowMenu(false); // Close the menu
//                 console.log("Menu closed because of outside click");
//             }
//         };

//         document.addEventListener('click', closeMenu);

//         return () => document.removeEventListener('click', closeMenu);
//     }, [showMenu]);

//     const closeMenuManually = () => {
//         setShowMenu(false);
//         console.log("Menu closed manually");
//     }; 

//     const logoutClick = (e) => {
//         e.preventDefault();
//         dispatch(logout());
//         closeMenuManually();
//         navigate('/');
//         console.log("User logged out");
//     };

//     const dropdownClasses = "profile-dropdown" + (showMenu ? "" : " hidden");

//     return (
//         <div>
//             <button id="toggle-menu-button" onClick={toggleMenu}>
//                 <IoMenu />
//                 <FaCircleUser />
//             </button>
//             <ul className={dropdownClasses} ref={ulRef}> {/* Attach the ref to the dropdown menu */}
//                 {user ? (
//                     <>
//                         <li>Hello, {user.firstName}</li>
//                         <li>{user.email}</li>
//                         <hr></hr>
//                         <li onClick={() => navigate('/spots/current')}>Manage Spots</li>
//                         <hr></hr>
//                         <li id="logout">
//                             <button onClick={logoutClick}>Log Out</button>
//                         </li>
//                     </>
//                 ) : (
//                     <>
//                         <OpenModalMenuItem
//                             itemText="Sign Up"
//                             onItemClick={closeMenuManually} // Close menu after clicking
//                             modalComponent={<SignupFormModal />}
//                         />
//                         <OpenModalMenuItem
//                             itemText="Log In"
//                             onItemClick={closeMenuManually} // Close menu after clicking
//                             modalComponent={<LoginFormModal />}
//                         />
//                     </>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default ProfileButton;

