import { useModal } from '../../context/Modal'
import React from "react";

const OpenModalButton = ({modalComponent, buttonText, onButtonClick, onModalClose}) => {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        console.log('Button clicked');
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onButtonClick === 'function') onButtonClick();
        console.log('Modal content set:', modalComponent);
    }
    return (
        <button onClick={onClick}>{buttonText}</button>
    )
}

export default OpenModalButton;