import { useModal } from "../../context/Modal";
import React from "react";

const OpenModalMenuItem = ({ modalComponent, itemText }) => {
    const { setModalContent } = useModal();

    const onClick = () => {
        console.log('Clicked on:', itemText); 
        setModalContent(modalComponent);
        console.log('Modal content set to:', modalComponent);  // Log to ensure the content is being set correctly
    };

    return (
        <li onClick={onClick}>
            {itemText}
        </li>
    );
};

export default OpenModalMenuItem;



// import { useModal } from "../../context/Modal";
// import React from "react";

// const OpenModalMenuItem = ({ modalComponent, itemText, onItemClick, onModalClose, className }) => {
//     const { setModalContent, setOnModalClose } = useModal();

//     const onClick = () => {
//         console.log('Clicked on:', itemText); 
//         if (onModalClose) {
//             setOnModalClose(onModalClose);
//             console.log('onModalClose function set'); 
//         }
//         setModalContent(modalComponent);
//         console.log('Modal content set to:', modalComponent); 
//         if (typeof onItemClick === 'function') {
//             onItemClick();
//             console.log('onItemClick function executed'); 
//         }
//     };

//     return (
//         <li className={className} onClick={onClick}>
//             {itemText}
//         </li>
//     );
// };

// export default OpenModalMenuItem;
