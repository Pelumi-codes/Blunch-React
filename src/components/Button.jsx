import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  height: 4.8rem;
  width: ${(props) => (props.fullWidth ? "100%" : props.width ?? "20rem")};
  background-color: ${(props) =>
    props.disabled ? "var(--border_color)" : "var(--primary)"};
  color: var(--white);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.75px;
  text-align: center;
  transition: background 250ms ease-in;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "var(--border_color)" : "var(--primary_dark)"};
  }

  &.bordered {
    background-color: transparent;
    border: 2px solid
      ${(props) => (props.disabled ? "var(--border_color)" : "var(--primary)")};
    color: ${(props) =>
      props.disabled ? "var(--border_color)" : "var(--primary)"};

    &:hover {
      background-color: transparent;
      border: 2px solid
        ${(props) =>
          props.disabled ? "var(--border_color)" : "var(--primary_dark)"};
      color: ${(props) =>
        props.disabled ? "var(--border_color)" : "var(--primary_dark)"};
    }
  }

  &.link {
    background-color: transparent;
    border: none;
    color: ${(props) =>
      props.disabled ? "var(--border_color)" : "var(--primary)"};

    &:hover {
      background-color: transparent;
      border: none;
      color: ${(props) =>
        props.disabled ? "var(--border_color)" : "var(--primary_dark)"};
    }
  }
`;

const Button = ({
  className,
  type,
  fullWidth,
  width,
  text,
  disabled,
  color,
  as,
  href,
  target,
  rel,
  onClick,
  loading,
}) => {
  const styleProps = {
    className,
    type,
    fullWidth,
    width,
    text,
    disabled,
    color,
    as,
    href,
    target,
    rel,
    onClick,
  };
  return <Wrapper {...styleProps}>{loading ? "..." : text}</Wrapper>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
  loading: PropTypes.bool,
};

export default Button;
