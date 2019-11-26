// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Link,
  Deck,
  Heading,
  Image,
  List,
  ListItem,
  Notes,
  Quote,
  Slide,
  Text,
  CodePane
} from "spectacle";
import CodeSlide from "../spectacle-code-slide";
import ComponentPlayground from "../component-playground";

// Import theme
import createTheme from "spectacle/lib/themes/default";

import { GridExampleA, GridExampleB } from "../src/GridContext";
import { ScrollExample } from "../src/ScrollContext";
import { ModalExample } from "../src/ModalContext";

const images = {
  freddy: require("../assets/freddy.png"),
  twitter: require("../assets/twitter.png")
};

// Require CSS
require("normalize.css");
//require("prismjs/themes/prism-tomorrow.css");

const theme = createTheme(
  {
    primary: "white",
    secondary: "#2a2734", //"#1F2022",
    tertiary: "#9a86fd", //"#03A9FC",
    quaternary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);
theme.screen.progress.bar.container.height = "5px";
theme.screen.components.list.listStylePosition = "outside";

const styleSlideContentFullScreen = {
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  maxHeight: "100%"
};

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["slide"]}
        transitionDuration={500}
        progress="bar"
        controls={false}
        showFullscreenControl={false}
        theme={theme}
      >
        <Slide bgColor="tertiary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            React Context
          </Heading>
          <Heading size={1} fit caps textColor="secondary">
            UI examples
          </Heading>
        </Slide>

        <Slide bgColor="secondary">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0 auto 1.5em"
            }}
          >
            <img
              src={images.freddy}
              style={{
                width: 150,
                height: 150,
                display: "block",
                borderRadius: 75,
                border: "solid white 4px"
              }}
            />
            <div style={{ textAlign: "left", marginLeft: "1em" }}>
              <Heading caps size={5} textColor="primary" margin="0.25rem auto">
                Freddy Harris
              </Heading>
              <Text textColor="tertiary">Freelance React Native</Text>
            </div>
          </div>

          <div style={{ textAlign: "left" }}>
            <a
              href="https://twitter.com/HarrisFreddy"
              style={{
                display: "inline-block",
                textDecoration: "none",
                backgroundColor: "white",
                padding: "16px 40px 20px",
                borderRadius: 40,
                color: "black",
                fontWeight: "bold"
              }}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAN1qAADdagGTXX1TAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAvdQTFRF////AQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACqEq6ygAAAPx0Uk5TAAECAwQFBgcICQoLDA0O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"
                style={{
                  border: "none",
                  boxShadow: "none",
                  verticalAlign: "sub",
                  height: 35,
                  margin: "0px 15px 0px 0px"
                }}
              />
              @harrisfreddy
            </a>
          </div>
        </Slide>

        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={2} caps textColor="secondary" textAlign="left">
            Context API
          </Heading>
          <BlockQuote>
            <Quote textSize="4rem">
              Context provides a way to pass data through the component tree
              without having to pass props down manually at every level.
            </Quote>
          </BlockQuote>
        </Slide>

        <Slide bgColor="secondary">
          <Heading caps fit size={1} textColor="tertiary">
            Grid
          </Heading>
        </Slide>

        <Slide>
          <GridExampleA />
        </Slide>

        <CodeSlide
          contentStyles={styleSlideContentFullScreen}
          bgColor="secondary"
          textColor="primary"
          transition={[]}
          lang="jsx"
          code={require("raw-loader!../assets/grid-layout.example")}
          ranges={[
            { loc: [0, 87], title: "Grid Layout" },
            { loc: [2, 17] },
            { loc: [20, 23], note: "Context" },
            { loc: [26, 27] },
            { loc: [48, 53], note: "Provider" },
            { loc: [27, 30] },
            { loc: [40, 47] },
            { loc: [31, 39] },
            { loc: [64, 71] },
            { loc: [59, 61], note: "Hook" },
            { loc: [72, 86] }
          ]}
          showLineNumbers={false}
        />

        <Slide>
          <GridExampleB />
        </Slide>

        <CodeSlide
          contentStyles={styleSlideContentFullScreen}
          bgColor="secondary"
          textColor="primary"
          transition={[]}
          lang="jsx"
          code={require("raw-loader!../assets/grid-columns.example")}
          ranges={[
            { loc: [0, 133], title: "Grid Columns" },
            { loc: [3, 5] },
            { loc: [10, 21] },
            { loc: [34, 39], note: "Context" },
            { loc: [46, 49] },
            { loc: [50, 61] },
            { loc: [70, 78] },
            { loc: [79, 84], note: "Provider" },
            //{ loc: [90, 96], note: "Hook" },
            { loc: [97, 104], note: "Hook" },
            { loc: [115, 132] }
          ]}
          showLineNumbers={false}
        />

        <Slide bgColor="secondary">
          <Heading caps fit size={1} textColor="tertiary">
            Scroll
          </Heading>
        </Slide>

        <Slide>
          <ScrollExample />
        </Slide>

        <CodeSlide
          contentStyles={styleSlideContentFullScreen}
          bgColor="secondary"
          textColor="primary"
          transition={[]}
          lang="jsx"
          code={require("raw-loader!../assets/scroll.example")}
          ranges={[
            { loc: [0, 78], title: "Scroll" },
            { loc: [2, 5], note: "Context" },
            { loc: [8, 12] },
            { loc: [28, 35], note: "Provider" },
            { loc: [12, 14] },
            { loc: [15, 27] },
            { loc: [48, 55], note: "Hook" },
            { loc: [58, 65] },
            { loc: [66, 77] }
          ]}
          showLineNumbers={false}
        />

        <Slide bgColor="secondary">
          <Heading caps fit size={1} textColor="tertiary">
            Modal
          </Heading>
        </Slide>

        <Slide>
          <ModalExample />
        </Slide>

        <CodeSlide
          contentStyles={styleSlideContentFullScreen}
          bgColor="secondary"
          textColor="primary"
          transition={[]}
          lang="jsx"
          code={require("raw-loader!../assets/modal.example")}
          ranges={[
            { loc: [0, 100], title: "Modal" },
            { loc: [2, 5], note: "Context" },
            { loc: [8, 19], note: "Provider" },
            { loc: [23, 28] },
            { loc: [28, 29] },
            { loc: [46, 47] },
            { loc: [30, 45] },
            { loc: [73, 80] },
            { loc: [81, 99] }
          ]}
          showLineNumbers={false}
        />

        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={4} caps textColor="secondary">
            References
          </Heading>

          <Text textAlign="left" margin="1em auto 0.25rem">Documentation</Text>
          <List textColor="primary" margin="0px 0px 1em">
            <ListItem><Link href="https://reactjs.org/docs/context.html" textColor="primary" target="_blank">React - Context</Link></ListItem>
            <ListItem><Link href="https://reactjs.org/docs/hooks-reference.html" textColor="primary" target="_blank">React - Hooks</Link></ListItem>
          </List>

          <Text textAlign="left">Other</Text>
          <List textColor="primary" margin="0px 0px 1em">
            <ListItem><Link href="https://codesandbox.io/s/header-system-y8w9i" textColor="primary" target="_blank">Example that nest context providers to create a headers system that manages header tags (h1, h2, ...) on its own</Link></ListItem>
            <ListItem><Link href="https://twitter.com/zoontek" textColor="primary" target="_blank">For a more production ready example with Modal/Portal, ask @zoontek</Link></ListItem>
          </List>

        </Slide>

        <Slide bgColor="secondary">
          <Heading size={1} caps textColor="tertiary">
            Merci
          </Heading>
          <Heading size={5} caps margin="3em 0 0">
            <Link href="https://twitter.com/HarrisFreddy" textColor="primary">
              <img
                src={images.twitter}
                style={{
                  border: "none",
                  boxShadow: "none",
                  verticalAlign: "sub",
                  height: 60,
                  margin: "0 15px 0 0",
                  filter:
                    "invert(100%) sepia(100%) saturate(0%) hue-rotate(92deg) brightness(104%) contrast(101%)"
                }}
              />
              @harrisfreddy
            </Link>
          </Heading>
          <Heading size={6} caps textColor="tertiary" margin="1em 0 0.5em">
            Freelance React Native & React.js
          </Heading>
        </Slide>

      </Deck>
    );
  }
}
