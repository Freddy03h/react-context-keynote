import React, { useRef, useContext, useCallback, createContext } from "react";

// Context

export const ScrollContext = createContext({
  scrollTo: coord => {}
});

// Provider

function ScrollProvider({ children, style }) {
  const scrollRef = useRef(null);
  const scrollEl = scrollRef.current;

  const scrollTo = useCallback(
    coord => {
      if (scrollEl) {
        if (scrollEl.scrollTo) {
          scrollEl.scrollTo(coord, 0);
        } else {
          scrollEl.scrollTop = coord;
        }
      }
    },
    [scrollEl]
  );

  return (
    <ScrollContext.Provider value={{ scrollTo }}>
      <div ref={scrollRef} css={{ ...styles.scroll, ...style }}>
        {children}
      </div>
    </ScrollContext.Provider>
  );
}

const styles = {
  scroll: {
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    scrollBehavior: "smooth"
  }
};

export default ScrollProvider;

// Consumer

const useScrollContext = () => useContext(ScrollContext);

export const useScrollTo = () => {
  const { scrollTo } = useScrollContext();
  return scrollTo;
};

// Example

const Button = () => {
  const scrollTo = useScrollTo();
  return <button onClick={() => scrollTo(0)}>Back to top</button>;
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
      <p style={{ marginTop: 0, marginBottom: "1em", textAlign: "left" }}>
        Fusce blandit quam ut ipsum dictum, sit amet vehicula felis lacinia.
        Vestibulum ullamcorper, erat quis tincidunt pretium, quam velit posuere
        enim, non tincidunt justo nunc ut nibh. Vestibulum sit amet porttitor
        ligula. Etiam scelerisque risus diam, nec semper erat congue at.
        Suspendisse eu luctus diam, vitae convallis est.
      </p>
      <Button />
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

export const ScrollExample = () => {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        backgroundColor: "#2a2734",
        padding: "2px"
      }}
    >
      <Scroll />
      <Scroll />
    </div>
  );
};
