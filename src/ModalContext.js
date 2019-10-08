import React, { useState, useRef, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import ScrollProvider from "./ScrollContext";

// Context

export const ModalContext = createContext({
  container: null
});

// Provider

function ModalProvider({ children }) {
  const containerRef = useRef(null);
  const container = containerRef.current;

  return (
    <ModalContext.Provider value={{ container }}>
      {children}
      <div ref={containerRef} />
    </ModalContext.Provider>
  );
}

export default ModalProvider;

// Component

export function Modal({ children, isOpen, onRequestClose }) {
  const { container } = useContext(ModalContext);

  const child = (
    <div style={{ ...styles.container, ...(isOpen && styles.containerOpen) }}>
      <div
        style={{ ...styles.overlay, ...(isOpen && styles.overlayOpen) }}
        onClick={onRequestClose}
      />
      <div style={{ ...styles.modal, ...(isOpen && styles.modalOpen) }}>
        {children}
      </div>
    </div>
  );

  return container ? ReactDOM.createPortal(child, container) : null;
}

const styles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    display: "flex",

    visibility: "hidden",
    transition: "visibility 0ms linear 250ms"
  },
  containerOpen: {
    visibility: "visible",
    transitionDelay: "0ms"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(6px)",

    opacity: 0,
    transition: "opacity 175ms ease-in-out 75ms"
  },
  overlayOpen: {
    opacity: 1,
    transitionDelay: "0ms"
  },
  modal: {
    position: "relative",
    margin: "auto",

    transition:
      "opacity 250ms ease-in-out 0ms, transform 250ms ease-in-out 0ms",
    opacity: 0,
    transform: "scale(0.8)"
  },
  modalOpen: {
    opacity: 1,
    transform: "initial"
  }
};

// Example

const Button = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setModalIsOpen(true)}>Confirm</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div>Info</div>
        <button onClick={() => setModalIsOpen(false)}>Ok</button>
      </Modal>
    </>
  );
};

const Screen = () => {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar
        justo et quam placerat blandit. Donec quis lacinia mi. Vestibulum
        imperdiet, nisi eu blandit accumsan, orci metus viverra lorem, sit amet
        ornare sapien elit maximus ex. Proin porttitor tempor mattis. Sed
        pretium arcu et placerat varius.
      </p>
      <Button />
      <p>
        Fusce blandit quam ut ipsum dictum, sit amet vehicula felis lacinia.
        Vestibulum ullamcorper, erat quis tincidunt pretium, quam velit posuere
        enim, non tincidunt justo nunc ut nibh. Vestibulum sit amet porttitor
        ligula. Etiam scelerisque risus diam, nec semper erat congue at.
        Suspendisse eu luctus diam, vitae convallis est.
      </p>
    </div>
  );
};

const Scroll = () => {
  return (
    <ScrollProvider
      style={{
        flexGrow: 1,
        border: "solid black 1px",
        margin: "1px",
        padding: "5px"
      }}
    >
      <Screen />
    </ScrollProvider>
  );
};

export const ModalExample = () => {
  return (
    <div style={{ height: "60vh", display: "flex" }}>
      <div style={{ position: "relative", display: "flex" }}>
        <ModalProvider>
          <Scroll />
        </ModalProvider>
      </div>
      <div style={{ position: "relative", display: "flex" }}>
        <ModalProvider>
          <Scroll />
        </ModalProvider>
      </div>
    </div>
  );
};
