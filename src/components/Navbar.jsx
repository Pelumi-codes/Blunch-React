import styled from "styled-components";
import Container from "./Container";
import Logo from "./Logo";
// import instagram from "../assets/instagram.svg";
// import whatsapp from "../assets/whatsapp.svg";

const Wrapper = styled(Container)`
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.6rem;
  z-index: 5;

  .socials {
    width: max-content;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2.4rem;

    .icon {
      height: 2.4rem;
    }
  }

  @media screen and (min-width: 768px) {
    height: 9.6rem;
  }
`;

export default function Navbar() {
  return (
    <Wrapper as="nav">
      <Logo />
      {/* <div className="socials">
        <a
          href="https://wa.link/o3b1bj"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={whatsapp} alt="instagram" className="icon" />
        </a>
        <a
          href="https://instagram.com/blunchng"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagram} alt="instagram" className="icon" />
        </a>
      </div> */}
    </Wrapper>
  );
}
