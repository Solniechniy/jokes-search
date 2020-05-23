import styled from "styled-components";

const RadioWrapper = styled.div`
  margin: 16px 0;

  input[type="radio"] {
    display: none;

    &:checked + label:before {
      border-color: #333;
      animation: ripple 0.4s linear forwards;
    }

    &:checked + label:after {
      transform: scale(1);
    }
  }

  label {
    display: inline-block;
    height: 20px;
    position: relative;
    padding: 0 30px;
    margin-bottom: 0;
    cursor: pointer;
    vertical-align: bottom;

    &:before,
    &:after {
      position: absolute;
      content: "";
      border-radius: 50%;
      transition: all 0.3s ease;
      transition-property: transform, border-color;
    }

    &:before {
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      border: 2px solid #333;
    }

    &:after {
      top: 5px;
      left: 5px;
      width: 10px;
      height: 10px;
      transform: scale(0);
      background: #333;
    }
  }
`;

export { RadioWrapper };
