import { useModal } from "../../context/Modal";
import React from "react";

const OpenModalMenuItem = ({ modalComponent, itemText, onItemClick, onModalClose, className }) => {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        console.log("Opening Modal:", modalComponent);
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onItemClick === 'function') onItemClick();
    };

    return (
        <li className={className} onClick={onClick}>{itemText}</li>
    );
};

export default OpenModalMenuItem;




// import { useModal } from "../../context/Modal";
// import React from "react";

// const OpenModalMenuItem = ({ modalComponent, itemText, onItemClick, onModalClose, className }) => {
//     const { setModalContent, setOnModalClose } = useModal();

//     const onClick = () => {
//         console.log("Opening Modal:", modalComponent);
//         if (onModalClose) setOnModalClose(onModalClose);
//         setModalContent(modalComponent);
//         if (typeof onItemClick === 'function') onItemClick();
//     }

//     return (
//         <li className={className} onClick={onClick}>{itemText}</li>
//     );
// };

// export default OpenModalMenuItem;

