import styled, { keyframes } from "styled-components";
import logo from "../assets/logo.svg";

const bounce = keyframes`
  from {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-2.4rem);
  }

  to {
    transform: translateY(0);
  }
`;

const load = keyframes`
  from {
    width: 0;
  }

  20% {
    width: 30%;
  }

  40% {
    width: 40%;
  }

  50% {
    width: 40%;
  }

  60% {
    width: 40%;
  }

  to {
    width: 95%;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-out;

  .text {
    position: relative;
    color: var(--sup_text);
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    margin-top: 1.2rem;
  }

  .progress {
    display: block;
    width: 100%;
    background-color: var(--background);
    position: absolute;
    top: calc(100% + 1.2rem);
    left: 0;
    height: 3px;
    border-radius: 3px;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background-color: var(--primary);
      animation: ${load} 1.5s ease-in-out forwards;
    }
  }

  .logo {
    height: 7.2rem;
    animation: ${bounce} 1s ease-in-out infinite;
  }
`;

export default function Loader() {
  return (
    <Wrapper>
      <img src={logo} alt="Blunch.ng" className="logo" />
      <p className="text">
        Blunch.ng<span className="progress"></span>
      </p>
    </Wrapper>
  );
}
