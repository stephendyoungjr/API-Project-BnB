// import React from 'react';
// import { useRef, createContext, useState, useContext, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import './Modal.css';

// const ModalContext = createContext();

// export const ModalProvider = ({ children }) => {
//     const modalRef = useRef(null); // Initialize with null
//     const [modalContent, setModalContent] = useState(null);
//     const [onModalClose, setOnModalClose] = useState(null);

//     // Check if the modal-root is properly rendered
//     useEffect(() => {
//         if (!modalRef.current) {
//             console.error("modal-root not found in the DOM.");
//         }
//     }, []);

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
//             <div id="modal-root" ref={modalRef} /> {/* Ensure this is rendered */}
//         </>
//     );
// };

// export const Modal = () => {
//     const { modalRef, modalContent, closeModal } = useContext(ModalContext);
//     console.log('Modal content:', modalContent);
//     console.log('Modal ref:', modalRef.current); // Log the modalRef

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


import { useRef, useState, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal, // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);