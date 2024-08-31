import { useModal } from "../../context/Modal";
import React from "react";

const OpenModalMenuItem = ({ modalComponent, itemText, onItemClick, onModalClose, className }) => {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        console.log("Opening Modal with component:", modalComponent);
        if (onModalClose) {
            setOnModalClose(onModalClose);
            console.log("Setting onModalClose callback");
        }
        setModalContent(modalComponent);
        console.log("Modal content set:", modalComponent);

        if (typeof onItemClick === 'function') {
            onItemClick();
            console.log("Item click handler executed");
        }
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
//     };

//     return (
//         <li className={className} onClick={onClick}>{itemText}</li>
//     );
// };

// export default OpenModalMenuItem;

