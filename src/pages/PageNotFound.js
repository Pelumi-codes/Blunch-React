import styled from "styled-components";
import Navbar from "../components/Navbar";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .prompt {
    font-size: 24px;
    line-height: 36px;
    text-transform: capitalize;
  }
`;

export default function PageNotFound() {
  return (
    <Wrapper>
      <Navbar />
      <p className="prompt">404 | Page not found.</p>
    </Wrapper>
  );
}
