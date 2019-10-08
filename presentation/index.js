// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
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
  formidagon: require("../assets/formidable-logo.svg"),
  goodWork: require("../assets/good-work.gif")
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

        <Slide bgColor="secondary"></Slide>

        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={2} caps textColor="secondary">
            Context API
          </Heading>
          <BlockQuote>
            <Quote>Example Quote</Quote>
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
            { loc: [0, 136], title: "Grid Columns" },
            { loc: [3, 5] },
            { loc: [10, 26] },
            { loc: [39, 44], note: "Context" },
            { loc: [51, 54] },
            { loc: [55, 66] },
            { loc: [75, 83] },
            { loc: [84, 89], note: "Provider" },
            { loc: [95, 101], note: "Hook" },
            { loc: [102, 109], note: "Hook" },
            { loc: [120, 135] }
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
            { loc: [0, 94], title: "Modal" },
            { loc: [2, 5], note: "Context" },
            { loc: [8, 19], note: "Provider" },
            { loc: [24, 45] },
            { loc: [70, 77] },
            { loc: [78, 93] }
          ]}
          showLineNumbers={false}
        />

        {/***************************************** */}

        {/*<Slide bgColor="secondary">
          <Image src={images.formidagon} width={800} />
        </Slide> */}

        {/*<Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Spectacle Boilerplate
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" fit bold>
            open the presentation/index.js file to get started
          </Text>
        </Slide>

        <Slide bgColor="tertiary">
          <Heading size={6} textColor="primary" caps>
            Typography
          </Heading>
          <Heading size={1} textColor="secondary">
            Heading 1
          </Heading>
          <Heading size={2} textColor="secondary">
            Heading 2
          </Heading>
          <Heading size={3} textColor="secondary">
            Heading 3
          </Heading>
          <Heading size={4} textColor="secondary">
            Heading 4
          </Heading>
          <Heading size={5} textColor="secondary">
            Heading 5
          </Heading>
          <Text size={6} textColor="secondary">
            Standard text
          </Text>
        </Slide>

        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Standard List
          </Heading>
          <List>
            <ListItem bulletStyle="star">Item 1</ListItem>
            <ListItem bulletStyle="cross">Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>

        <Slide bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite margin="10px 0 0 30px">Author</Cite>
          </BlockQuote>
        </Slide>

        <Slide>
          <Image src={images.goodWork} width={500} />
          <Notes>gifs work too</Notes>
        </Slide>*/}

        {/*<Slide bgColor="secondary" contentStyles={styleSlideContentFullScreen}>
          <CodePane
            lang="jsx"
            source={require("raw-loader!../assets/deck.example")}
            theme="dark"
          />
    </Slide>*/}

        {/*<Slide bgColor="secondary" contentStyles={styleSlideContentFullScreen}>
          <ComponentPlayground
            theme="dark"
            code={code}
            scope={{ NewComponent }}
          />
    </Slide>*/}
      </Deck>
    );
  }
}
