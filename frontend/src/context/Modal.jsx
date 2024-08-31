
import React, { useRef, createContext, useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const modalRef = useRef(null); // Initialize with null
    const [modalContent, setModalContent] = useState(null);
    const [onModalClose, setOnModalClose] = useState(null);

    useEffect(() => {
        console.log('ModalProvider mounted. modalRef:', modalRef.current);
    }, [modalRef.current]);

    const closeModal = () => {
        setModalContent(null);
        if (typeof onModalClose === 'function') {
            setOnModalClose(null);
            onModalClose();
        }
    };

    const contextValue = {
        modalRef,
        modalContent,
        setModalContent,
        setOnModalClose,
        closeModal
    };

    console.log('Rendering ModalProvider:', modalRef.current); // Log to see if modalRef is set correctly

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div id="modal-root" ref={modalRef} />
        </>
    );
};

export const Modal = () => {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);
    console.log('Modal content:', modalContent);
    console.log('Modal ref (inside Modal):', modalRef.current); // Log to check if modalRef is set inside Modal

    // If the ref is null or there's no content, return null
    if (!modalRef.current || !modalContent) return null;

    console.log('Rendering Modal in:', modalRef.current); // Log where the modal is being rendered

    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={closeModal} />
            <div id='modal-content'>{modalContent}</div>
        </div>,
        modalRef.current
    );
};

export const useModal = () => useContext(ModalContext);


// 


