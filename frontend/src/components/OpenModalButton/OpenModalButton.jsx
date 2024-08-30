// import { useModal } from '../../context/Modal';
// import React from "react";

// const OpenModalButton = ({ modalComponent, buttonText, onButtonClick, onModalClose }) => {
//     const { setModalContent, setOnModalClose } = useModal();

//     const onClick = () => {
//         if (onModalClose) {
//             setOnModalClose(!onModalClose)
//         }
//         setModalContent(modalComponent);
//         if (typeof onButtonClick === 'function') {
//             onButtonClick(); // Correctly calling onButtonClick instead of onItemClick
//         }
//     };

//     return (
//         <button onClick={onClick}>{buttonText}</button>
//     );
// };

// export default OpenModalButton;

import { useModal } from '../../context/Modal';
import React from "react";

const OpenModalButton = ({ modalComponent, buttonText, onButtonClick, onModalClose }) => {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) {
            setOnModalClose(onModalClose)
        }
        setModalContent(modalComponent);
        if (typeof onButtonClick === 'function') {
            onButtonClick(); // Correctly calling onButtonClick instead of onItemClick
        }
    };

    return (
        <button onClick={onClick}>{buttonText}</button>
    );
};

export default OpenModalButton;

