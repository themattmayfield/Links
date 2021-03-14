import React, { useState } from "react";
import useLongPress from "../utils/scripts/useLongPress";
import styled, { keyframes, css } from 'styled-components'

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
  animation: ${props => (props.isShaking ? css`${rotate} 2s linear infinite` : "")};
  animation-iteration-count: infinite;
  transform-origin: 50% 10%;

  animation-delay: -.5s;
  animation-duration: .3s
`;


export default function NewCard() {
    const [longPressCount, setlongPressCount] = useState(0)
    const [clickCount, setClickCount] = useState(0)
    const [shake, setShake] = useState(false)
  
    const onLongPress = () => {
      console.log('longpress is triggered');
      setlongPressCount(longPressCount + 1)
      setShake(true)
    };
  
    const onClick = () => {
      console.log('click is triggered')
      setClickCount(clickCount + 1)
    }
  
    const defaultOptions = {
      shouldPreventDefault: true,
      delay: 500,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  
    return (
      // <Shake distance="50%" forever={infinite}>
      <BouncyDiv isShaking={shake} className="w-full h-full">
        <div {...longPressEvent} className="w-full h-full bg-gray-400 rounded-xl wiggle"></div>
      
       </BouncyDiv>
    )
  }



