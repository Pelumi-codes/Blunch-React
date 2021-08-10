import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import chevronDown from "../assets/chevron_down.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  background-color: var(--white);
  border-radius: 1rem;
  padding: ${(props) =>
    props.fieldStyle === "dropdown"
      ? 0
      : props.fieldStyle === "longText"
      ? "1.6rem"
      : "0 1.6rem"};
  height: ${(props) =>
    props.fieldStyle === "longText" ? "max-content" : "4.8rem"};
  border: ${(props) =>
    props.fieldStyle === "dropdown" ? "none" : "1px solid var(--border_color)"};
  position: relative;

  input,
  textarea,
  select {
    display: block;
    color: var(--text);
    width: 100%;
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0px;

    &::placeholder {
      color: ${(props) =>
        props.disabled ? "var(--border_color)" : "var(--sup_text)"};
    }
  }

  select {
    cursor: pointer;
    color: #8d9091;
  }

  select:invalid {
    color: var(--sup_text);
  }

  .toggleShowText {
    display: none;
  }

  &.password {
    input,
    textarea {
      width: 80%;
    }

    .toggleShowText {
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 2.4rem;
      cursor: pointer;
      color: #8d9091;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: 0px;
    }
  }

  textarea {
    height: 14.4rem;
  }

  label {
    display: block;
    color: var(--sup_text);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0em;
  }

  .dropdownIcon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2.4rem;
    pointer-events: none;
    height: 1.6rem;
  }
`;

const handleToggleShow = (e, id) => {
  const toggler = e.target;
  const field = document.querySelector(`#${id}`);

  if (field.type === "password") {
    field.type = "text";
    toggler.innerText = "Hide";
  } else {
    field.type = "password";
    toggler.innerText = "Show";
  }
};

const FormGroup = ({
  className,
  fieldStyle,
  inputType,
  name,
  placeholder,
  required = true,
  options = [],
  defaultValue,
  disabled,
}) => {
  const [showLabel, setShowLabel] = useState(false);

  const toggleLabel = (e) => {
    if (e.target.value.length > 0) {
      setShowLabel(true);
    } else {
      setShowLabel(false);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setShowLabel(true);
    }
  }, [defaultValue]);

  return (
    <Wrapper className={className} fieldStyle={fieldStyle} disabled={disabled}>
      {fieldStyle === "shortText" && (
        <>
          <input
            className="textSmall"
            type={inputType}
            id={name}
            name={name}
            placeholder={placeholder}
            onBlur={toggleLabel}
            onChange={toggleLabel}
            required={required || false}
            defaultValue={defaultValue}
            disabled={disabled}
          />
          {showLabel && <label htmlFor={name}>{placeholder}</label>}
          {inputType === "password" && (
            <span
              className="toggleShowText"
              onClick={(e) => handleToggleShow(e, name)}
            >
              Show
            </span>
          )}
        </>
      )}
      {fieldStyle === "longText" && (
        <>
          <textarea
            className="textSmall"
            id={name}
            name={name}
            placeholder={placeholder}
            required={required || false}
            defaultValue={defaultValue}
            disabled={disabled}
          />
          {showLabel && <label htmlFor={name}>{placeholder}</label>}
        </>
      )}

      {fieldStyle === "select" && (
        <>
          <select
            className="textSmall"
            type={inputType}
            id={name}
            name={name}
            placeholder={placeholder}
            onBlur={toggleLabel}
            onChange={toggleLabel}
            required={required || false}
            defaultValue={defaultValue}
            disabled={disabled}
          >
            <option value="" hidden>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {showLabel && <label htmlFor={name}>{placeholder}</label>}
          <img src={chevronDown} alt="dropdown" className="dropdownIcon" />
        </>
      )}
    </Wrapper>
  );
};

FormGroup.propTypes = {
  className: PropTypes.string,
  fieldStyle: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array,
  disabled: PropTypes.bool,
};

export default FormGroup;
