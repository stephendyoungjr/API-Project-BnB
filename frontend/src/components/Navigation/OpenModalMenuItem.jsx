import { useModal } from "../../context/modal";

const OpenModalMenuItem = ({modalComponent, itemText, onItemClick, onModalClose, className}) => {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onItemClick === 'function') onItemClick();
    }

    return (
        <li className={className} onClick={onClick}>{itemText}</li>
    )
};

export default OpenModalMenuItem;


// import { useModal } from "../../context/Modal";
// import React from "react";

// const OpenModalMenuItem = ({ modalComponent, itemText }) => {
//     const { setModalContent } = useModal();

//     const onClick = () => {
//         console.log('Clicked on:', itemText); 
//         setModalContent(modalComponent);
//         console.log('Modal content set to:', modalComponent);  // Log to ensure the content is being set correctly
//     };

//     return (
//         <li onClick={onClick}>
//             {itemText}
//         </li>
//     );
// };

// export default OpenModalMenuItem;



