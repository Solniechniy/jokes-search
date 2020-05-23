import React from "react";
import { RadioWrapper } from "./RadioButton.styles";

export default function RadioButton({
  label,
  value,
  selectedOption,
  handleChange,
}) {
  return (
    <RadioWrapper>
      <input
        id={value}
        type="radio"
        value={value}
        checked={selectedOption === value}
        onChange={(e) => handleChange(e.target.value)}
      />
      <label htmlFor={value}>{label}</label>
    </RadioWrapper>
  );
}
