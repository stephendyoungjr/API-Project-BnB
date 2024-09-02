import { useRef, createContext, useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import React from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const modalRef = useRef(null);
    const [modalContent, setModalContent] = useState(null);
    const [onModalClose, setOnModalClose] = useState(null);

    const closeModal = () => {
        setModalContent(null);
        if (typeof onModalClose === 'function') {
            setOnModalClose(null);
            onModalClose();
        }
    };

    useEffect(() => {
        if (modalRef.current) {
            console.log('modalRef is attached to the DOM:', modalRef.current);
        } else {
            console.error('modalRef is not attached to the DOM.');
        }
    }, [modalRef.current]);

    const contextValue = {
        modalRef,
        modalContent,
        setModalContent,
        setOnModalClose,
        closeModal,
    };

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} id="modal-container" />
        </>
    );
};

export const Modal = () => {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);

    console.log('Rendering Modal with content:', modalContent); // Log the content to be rendered
    console.log('Modal reference:', modalRef.current); // Log the modal reference

    if (!modalRef.current || !modalContent) {
        console.log('Modal not rendered. Conditions not met.');
        return null;
    }

    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={closeModal} />
            <div id='modal-content' key={modalContent?.type?.name || 'default'}>
                {modalContent}
            </div>
        </div>,
        modalRef.current
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    console.log('useModal context:', context);
    return context;
};



// import { useRef, createContext, useState, useContext } from 'react';
// import ReactDOM from 'react-dom';
// import './Modal.css'
// import React from 'react';

// const ModalContext = createContext();

// export const ModalProvider = ({children}) => {
//     const modalRef = useRef()
//     const [modalContent, setModalContent] = useState(null);
//     const [onModalClose, setOnModalClose] = useState(null)

//     const closeModal = () => {
//         setModalContent(null);
//         if (typeof onModalClose === 'function') {
//             setOnModalClose(null);
//             onModalClose()
//         }
//     }

//     const contextValue = {
//         modalRef,
//         modalContent,
//         setModalContent,
//         setOnModalClose,
//         closeModal
//     }

//     return (
//         <>
//             <ModalContext.Provider value={contextValue}>
//                 {children}
//             </ModalContext.Provider>
//             <div ref={modalRef} />
//         </>
//     )
// }

// export const Modal = () => {
//     const { modalRef, modalContent, closeModal } = useContext(ModalContext);

//     console.log('Rendering Modal with content:', modalContent); // Log the content to be rendered
//     console.log('Modal reference:', modalRef.current); // Log the modal reference

//     if (!modalRef || !modalRef.current || !modalContent) {
//         console.log('Modal not rendered. Conditions not met.'); // Log if modal does not render
//         return null;
//     }

//     return ReactDOM.createPortal(
//         <div id='modal'>
//             <div id='modal-background' onClick={closeModal} />
//             <div id='modal-content'>{modalContent}</div>
//         </div>,
//         modalRef.current
//     );
// };


// export const useModal = () => {
//     const context = useContext(ModalContext);
//     console.log('useModal context:', context); 
//     return context;
// };
