import React, { useState } from "react";
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
//   animation: ${rotate} 2s linear infinite;
  animation-iteration-count: infinite;
  transform-origin: 50% 10%;

  animation-delay: -.5s;
  animation-duration: .3s
`;


export default function NewCard({children}) {
    
    
    const [shake, setShake] = useState(false)
  
    
  
    return (
      // <Shake distance="50%" forever={infinite}>
      <BouncyDiv isShaking={shake} className="w-full h-full">
        {children}
      
       </BouncyDiv>
    )
  }




