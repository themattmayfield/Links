import React from "react";
import { useAuth } from "@/utils/auth";
import { toast } from "react-toastify";
import styled, { keyframes, css } from "styled-components";

export function PageContainer({ children, className }) {
  return <div className={`${className} w-full px-4`}>{children}</div>;
}

export const Default = ({ url }) => {
  const { user } = useAuth();
  return url ? (
    <div className="flex-shrink-0">
      <img
        src={url}
        className="object-cover rounded-full w-[100px] h-[100px] sm:w-40 sm:h-40 cursor-pointer border-[0.5px] border-black"
      />
    </div>
  ) : (
    <div className="grid place-items-center w-[100px] h-[100px] sm:w-40 sm:h-40 rounded-full bg-successGreen text-white cursor-pointer">
      <p className="text-xl sm:text-3xl">{`${user?.firstName[0]}${user?.lastName[0]}`}</p>
    </div>
  );
};

export const InputContainer = ({ children, label }) => (
  <div>
    <p className="text-[#929297] pl-2 font-light text-xs uppercase pb-1">
      {label}
    </p>
    <div className="bg-white pl-3 py-1 divide-y divide-lightBackgroundColor rounded ">
      {children}
    </div>
  </div>
);

export const Toast = (type, message, position, delay, close) => {
  toast[type](message, {
    position: position || toast.POSITION.TOP_RIGHT,
    autoClose: delay || 1800,
    closeButton: close || false,
  });
};

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

export const BouncyDiv = styled.div`
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

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
