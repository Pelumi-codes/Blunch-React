import styled from "styled-components";

const Container = styled.div`
  max-width: 100%;
  margin: auto;
  padding: 0 2.4rem;

  &.row,
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &.col,
  .col {
    flex-direction: column;
  }

  &.justify-center,
  .justify-center {
    justify-content: center;
  }

  &.space-between,
  .space-between {
    justify-content: space-between;
  }

  @media screen and (min-width: 769px) {
    padding: 0 4.8rem;
  }
`;

export default Container;
