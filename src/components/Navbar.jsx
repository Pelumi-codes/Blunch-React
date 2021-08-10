import styled from 'styled-components';
import Container from './Container';
import Logo from './Logo';

const Wrapper = styled(Container)`
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.6rem;

  @media screen and (min-width: 768px) {
    height: 9.6rem;
  }
`;

export default function Navbar() {
  return (
    <Wrapper as="nav">
      <Logo />
    </Wrapper>
  )
}