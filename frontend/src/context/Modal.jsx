import React from 'react';
import { useRef, createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const modalRef = useRef(null); // Initialize with null
    const [modalContent, setModalContent] = useState(null);
    const [onModalClose, setOnModalClose] = useState(null);

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

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div id="modal-root" ref={modalRef} /> {/* Ensure this is rendered */}
        </>
    );
};

export const Modal = () => {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);
    console.log('Modal content:', modalContent);
    console.log('Modal ref:', modalRef.current); // Log the modalRef

    // Check if the modalRef or content is null
    if (!modalRef.current || !modalContent) {
        console.log('Modal not rendered: either modalRef or modalContent is null');
        return null;
    }

    console.log('Rendering Modal Component'); // Confirm the modal is being rendered

    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={closeModal} />
            <div id='modal-content'>{modalContent}</div>
        </div>,
        modalRef.current
    );
};

export const useModal = () => useContext(ModalContext);
