import React, { useState, useContext, createContext } from "react";
import ScrollProvider from "./ScrollContext";

// Context

export const ModalContext = createContext({
  setModalView: view => {}
});

// Provider

function ModalProvider({ children }) {
  const [modalView, setModalView] = useState(null);

  return (
    <ModalContext.Provider value={{ setModalView }}>
      {children}
      <div>{modalView}</div>
    </ModalContext.Provider>
  );
}

export default ModalProvider;

// Component

export function Modal({ children, isOpen, onRequestClose }) {
  const { setModalView } = useContext(ModalContext);

  React.useEffect(() => {
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

    setModalView(child);

    return () => setModalView(null);
  }, [setModalView, children, isOpen]);

  return null;
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
    transitionProperty: "visibility",
    transitionDuration: "0ms",
    transitionTimingfunction: "linear",
    transitionDelay: "250ms"
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
    transitionProperty: "opacity",
    transitionDuration: "175ms",
    transitionTimingfunction: "ease-in-out",
    transitionDelay: "75ms"
  },
  overlayOpen: {
    opacity: 1,
    transitionDelay: "0ms"
  },
  modal: {
    position: "relative",
    margin: "auto",
    backgroundColor: "white",
    width: "60%",
    padding: "24px 0",
    borderRadius: 6,

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
    <div style={{ backgroundColor: "white", padding: "1em" }}>
      <p style={{ marginTop: 0, marginBottom: "1em", textAlign: "left" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar
        justo et quam placerat blandit. Donec quis lacinia mi. Vestibulum
        imperdiet, nisi eu blandit accumsan, orci metus viverra lorem, sit amet
        ornare sapien elit maximus ex. Proin porttitor tempor mattis. Sed
        pretium arcu et placerat varius.
      </p>
      <Button />
      <p style={{ marginTop: "1em", marginBottom: 0, textAlign: "left" }}>
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
        margin: "2px"
      }}
    >
      <Screen />
    </ScrollProvider>
  );
};

export const ModalExample = () => {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        backgroundColor: "#2a2734",
        padding: "2px"
      }}
    >
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
