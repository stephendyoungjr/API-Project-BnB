import { useModal } from '../../context/Modal';
import React from "react";

const OpenModalButton = ({ modalComponent, buttonText, onButtonClick, onModalClose }) => {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) {
            setOnModalClose(!onModalClose)
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


// import React from "react";


// const OpenModalButton = ({modalComponent, buttonText, onButtonClick, onModalClose}) => {
//     console.log('OpenModalButton rendered');
//     const { setModalContent, setOnModalClose } = useModal();


//     // const onClick = (e) => {
//     //     e.preventDefault()
//     //     console.log('Button clicked');
//     //     if (onModalClose) setOnModalClose(onModalClose);
//     //     setModalContent(modalComponent);
//     //     if (typeof onButtonClick === 'function') onButtonClick();
//     //     console.log('Modal content set:', modalComponent);
//     // }
//     const onClick = () => {
//         if (onModalClose) {
//             console.log('Setting onModalClose');
//             setOnModalClose(onModalClose);
//         }
//         console.log('Setting modal content:', modalComponent);
//         setModalContent(modalComponent);
//         if (typeof onItemClick === 'function') onItemClick();
//     }


  
//     return (
//         <button onClick={e=> {onClick(e)}}>{buttonText}</button>
//     )
// }
