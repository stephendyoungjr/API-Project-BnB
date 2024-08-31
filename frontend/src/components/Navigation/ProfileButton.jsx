import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = () => setShowMenu((prev) => !prev);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logoutClick = (e) => {
        e.preventDefault();
        dispatch(logout());
        setShowMenu(false);
        navigate("/");
    };

    return (
        <div>
            <button id="toggle-menu-button" onClick={toggleMenu}>
                <IoMenu />
                <FaCircleUser />
            </button>
            <ul ref={ulRef} className={`profile-dropdown ${showMenu ? "" : "hidden"}`}>
                {user ? (
                    <>
                        <li>Hello, {user.firstName}</li>
                        <li>{user.email}</li>
                        <hr />
                        <li onClick={() => navigate('/spots/current')}>Manage Spots</li>
                        <hr />
                        <li id="logout">
                            <button onClick={logoutClick}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <OpenModalButton
                            buttonText="Sign Up"
                            modalComponent={<SignupFormModal />}
                            onButtonClick={() => setShowMenu(false)} // Close menu after clicking
                        />
                        <OpenModalButton
                            buttonText="Log In"
                            modalComponent={<LoginFormModal />}
                            onButtonClick={() => setShowMenu(false)} // Close menu after clicking
                        />
                    </>
                )}
            </ul>
        </div>
    );
};

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

