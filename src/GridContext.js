import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext
} from "react";

const globalStyles = {
  colors: {
    default: "#191a49",
    primary: "#696CD1",
    men: "#447F8D",
    women: "#886AA7",
    error: "#B7585D",
    invalid: "#61676F"
  },
  grid: {
    gutterWidth: 16,
    columns: 12,
    maxMobileWidth: 768,
    maxTabletWidth: 1024,
    maxWidth: 1440
  }
};
const { grid } = globalStyles;

const gutterCount = grid.columns + 1;
const totalGuttersWidth = gutterCount * grid.gutterWidth;

function findColumnWidth(windowWidth) {
  const clampedWidth = Math.min(windowWidth, grid.maxWidth);
  const availableWidthWithoutGutters = clampedWidth - totalGuttersWidth;
  const columnWidth = availableWidthWithoutGutters / 12;
  return columnWidth;
}

function findLayoutType(windowWidth) {
  if (windowWidth < grid.maxMobileWidth) {
    return "mobile";
  } else if (windowWidth < grid.maxTabletWidth) {
    return "tablet";
  } else {
    return "desktop";
  }
}

// Context

export const GridContext = React.createContext({
  columnWidth: findColumnWidth(window.innerWidth),
  gutterWidth: grid.gutterWidth,
  layoutType: findLayoutType(window.innerWidth)
});

// Provider

function GridProvider({ children }) {
  const [columnWidth, setColumnWidth] = useState(
    findColumnWidth(window.innerWidth)
  );
  const [layoutType, setLayoutType] = useState(
    findLayoutType(window.innerWidth)
  );

  const handleResize = useCallback(
    event => {
      setColumnWidth(findColumnWidth(event.currentTarget.innerWidth));
      setLayoutType(findLayoutType(event.currentTarget.innerWidth));
    },
    [setColumnWidth, setLayoutType]
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const value = useMemo(
    () => ({
      columnWidth,
      gutterWidth: grid.gutterWidth,
      layoutType
    }),
    [columnWidth, layoutType]
  );

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
}

export default GridProvider;

// Consumer

export const useGridContext = () => useContext(GridContext);

export const useColumnsWidth = numColumns => {
  const { columnWidth, gutterWidth } = useGridContext();
  return columnWidth * numColumns + gutterWidth * (numColumns - 1);
};

export const useLayoutType = () => {
  const { layoutType } = useGridContext();
  return layoutType;
};

// Example

export const Root = ({ children }) => {
  return (
    <GridProvider>
      <div
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            margin: "0 auto",
            maxWidth: globalStyles.grid.maxWidth
          }}
        >
          {children}
        </div>
      </div>
    </GridProvider>
  );
};

export const GridTemplate = ({ display, children }) => {
  const { columnWidth, gutterWidth } = useGridContext();

  const arrayColumns = [...Array(12).keys()];

  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center"
      }}
    >
      {display && (
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1
          }}
        >
          {arrayColumns.map(i => (
            <div
              style={{
                backgroundColor: "#E0E0E0",
                width: columnWidth,
                flexShrink: 0,
                flexGrow: 0,
                flexBasis: "auto",
                marginRight: gutterWidth,
                marginLeft: i === 0 ? gutterWidth : 0
              }}
            />
          ))}
        </div>
      )}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          marginRight: gutterWidth,
          marginLeft: gutterWidth
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const ExampleA = () => {
  const layoutType = useLayoutType();
  return (
    <div
      style={{
        paddingTop: 38,
        paddingBottom: 38,
        color: "white",
        backgroundColor:
          layoutType === "mobile"
            ? "#E91E63"
            : layoutType === "tablet"
            ? "#2979FF"
            : "#9a86fd"
      }}
    >
      {layoutType}
    </div>
  );
};

export const GridExampleA = () => {
  return (
    <Root>
      <GridTemplate display={false}>
        <ExampleA />
      </GridTemplate>
    </Root>
  );
};

export const ExampleB = () => {
  const layoutType = useLayoutType();
  const widthDesktop = useColumnsWidth(6);
  const widthTablet = useColumnsWidth(8);
  return (
    <div
      style={{
        paddingTop: 38,
        paddingBottom: 38,
        color: "white",
        backgroundColor:
          layoutType === "mobile"
            ? "#E91E63"
            : layoutType === "tablet"
            ? "#2979FF"
            : "#9a86fd",
        width:
          layoutType === "desktop"
            ? widthDesktop
            : layoutType === "tablet"
            ? widthTablet
            : "auto"
      }}
    >
      {layoutType}
    </div>
  );
};

export const GridExampleB = () => {
  return (
    <Root>
      <GridTemplate display={true}>
        <ExampleB />
      </GridTemplate>
    </Root>
  );
};
