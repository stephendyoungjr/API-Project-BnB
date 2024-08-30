import { useModal } from '../../context/Modal'
import React from "react";

const OpenModalButton = ({modalComponent, buttonText, onButtonClick, onModalClose}) => {
    console.log('OpenModalButton rendered'); 
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = (e) => {
        e.preventDefault()
        console.log('Button clicked');
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onButtonClick === 'function') onButtonClick();
        console.log('Modal content set:', modalComponent);
    }
    return (
        <button onClick={e=> {onClick(e)}}>{buttonText}</button>
    )
}

export default OpenModalButton;