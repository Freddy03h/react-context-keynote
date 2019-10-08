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
    maxWidth: 1440,
    minWidth: 1024,
    maxTabletWidth: 1280
  }
};
const { grid } = globalStyles;

const gutterCount = grid.columns + 1;
const totalGuttersWidth = gutterCount * grid.gutterWidth;

function clamp(num, min, max) {
  return Math.min(max, Math.max(min, num));
}

function findColumnWidth(windowWidth) {
  const clampedWidth = clamp(windowWidth, grid.minWidth, grid.maxWidth);
  const availableWidthWithoutGutters = clampedWidth - totalGuttersWidth;
  const columnWidth = availableWidthWithoutGutters / 12;
  return Math.floor(columnWidth);
}

function findLayoutType(windowWidth) {
  if (windowWidth < grid.minWidth) {
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
      <div>{children}</div>
    </GridProvider>
  );
};

export const ExampleA = () => {
  const layoutType = useLayoutType();
  return (
    <div
      style={{
        backgroundColor:
          layoutType === "mobile"
            ? "pink"
            : layoutType === "tablet"
            ? "cyan"
            : "purple"
      }}
    >
      {layoutType}
    </div>
  );
};

export const GridExampleA = () => {
  return (
    <Root>
      <ExampleA />
    </Root>
  );
};

export const ExampleB = () => {
  const layoutType = useLayoutType();
  const width = useColumnsWidth(4);
  return (
    <div
      style={{
        backgroundColor:
          layoutType === "mobile"
            ? "pink"
            : layoutType === "tablet"
            ? "cyan"
            : "purple",
        width: layoutType === "desktop" ? width : "auto"
      }}
    >
      {layoutType}
    </div>
  );
};

export const GridExampleB = () => {
  return (
    <Root>
      <ExampleB />
    </Root>
  );
};
