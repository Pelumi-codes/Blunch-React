import styled from "styled-components";
import PropTypes from "prop-types";
import logo from "../assets/logo.svg";

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;

  .logo {
    height: 3.2rem;
  }

  @media screen and (min-width: 768px) {
    .logo {
      height: 4.8rem;
    }
  }
`;

const Logo = ({ className }) => {
  return (
    <Wrapper href="/" className={className}>
      <img src={logo} alt="Blunch" className="logo" />
    </Wrapper>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
