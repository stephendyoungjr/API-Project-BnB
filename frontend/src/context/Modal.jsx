
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

    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={closeModal} />
            <div id='modal-content'>{modalContent}</div>
        </div>,
        modalRef.current
    );
};

export const useModal = () => useContext(ModalContext);


// import React from 'react';
// import { useRef, createContext, useState, useContext } from 'react';
// import ReactDOM from 'react-dom';
// import './Modal.css';

// const ModalContext = createContext();

// export const ModalProvider = ({ children }) => {
//     const modalRef = useRef(null); // Initialize with null
//     const [modalContent, setModalContent] = useState(null);
//     const [onModalClose, setOnModalClose] = useState(null);

//     const closeModal = () => {
//         setModalContent(null);
//         if (typeof onModalClose === 'function') {
//             setOnModalClose(null);
//             onModalClose();
//         }
//     };

//     const contextValue = {
//         modalRef,
//         modalContent,
//         setModalContent,
//         setOnModalClose,
//         closeModal
//     };

//     return (
//         <>
//             <ModalContext.Provider value={contextValue}>
//                 {children}
//             </ModalContext.Provider>
//             <div id="modal-root" ref={modalRef} /> {/* Make sure this div is correctly rendered */}
//         </>
//     );
// };

// export const Modal = () => {
//     const { modalRef, modalContent, closeModal } = useContext(ModalContext);
//     console.log('Modal content:', modalContent);
//     console.log('Modal ref:', modalRef.current); // This should log a DOM element, not null

//     // If the ref is null or there's no content, return null
//     if (!modalRef.current || !modalContent) return null;

//     return ReactDOM.createPortal(
//         <div id='modal'>
//             <div id='modal-background' onClick={closeModal} />
//             <div id='modal-content'>{modalContent}</div>
//         </div>,
//         modalRef.current
//     );
// };

// export const useModal = () => useContext(ModalContext);
