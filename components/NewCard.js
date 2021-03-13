import React, { useState } from "react";
import useLongPress from "../utils/scripts/useLongPress";
import styled, { keyframes } from 'styled-components'

const wiggle = keyframes`
0% { transform: rotate(0deg); }
80% { transform: rotate(0deg); }
85% { transform: rotate(5deg); }
95% { transform: rotate(-5deg); }
100% { transform: rotate(0deg); }
`;


const myDiv = styled.div`

  display: inline-block;
  animation: ${wiggle} infinite;


&:hover {
  animation: none;
}
`;

export default function NewCard(props) {
    const [longPressCount, setlongPressCount] = useState(0)
    const [clickCount, setClickCount] = useState(0)
  
    const onLongPress = () => {
      console.log('longpress is triggered');
      setlongPressCount(longPressCount + 1)
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
      <myDiv>
        <div {...longPressEvent} className="w-full h-full bg-gray-400 rounded-xl wiggle"></div>
      </myDiv>
    )
  }




