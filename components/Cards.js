import { Responsive, WidthProvider } from "react-grid-layout";
import NewCard from "./NewCard";
import styled, { keyframes, css } from "styled-components";

const rotate = keyframes`
0% {
  transform: rotate(-1deg);
  animation-timing-function: ease-in;
}

50% {
  transform: rotate(1.5deg);
  animation-timing-function: ease-out;
}
`;

const BouncyDiv = styled.div`
  animation: ${(props) =>
    props.isShaking
      ? css`
          ${rotate} 2s linear infinite
        `
      : ""};
  //   animation: ${rotate} 2s linear infinite;
  animation-iteration-count: infinite;
  transform-origin: 50% 10%;

  animation-delay: -0.5s;
  animation-duration: 0.3s;
`;

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Cards(props) {
  const myLayout = {
    lg: props.layout,
    md: props.layout,
    sm: props.layout,
    xs: props.layout,
    xxs: props.layout,
  };

  return (
    <ResponsiveGridLayout
      isDraggable={props.jiggleMode}
      isResizable={false}
      className="layout "
      cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
      layouts={myLayout}
    >
      {props.layout.map((item, i) => (
        <div key={item.i}>
          <BouncyDiv isShaking={props.jiggleMode} className="w-full h-full">
            <NewCard
              jiggleMode={props.jiggleMode}
              removingModalHandler={props.removingModalHandler}
              itemID={item.i}
              isShaking={props.jiggleMode}
              jiggleModeHandler={props.jiggleModeHandler}
            />
          </BouncyDiv>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
