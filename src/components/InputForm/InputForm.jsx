import { Input } from "antd";
import React, { useState } from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
  const { placeholder = 'Nhập text', onChange, value, ...rests } = props;

  const handleOnChangeEmail = (e) => {
    console.log(e.target.value); // Log the input value
    if (rests.onChange) {
      rests.onChange(e); // Call the onChange prop if it exists
    }
  };
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value); 
    }
  };

  return (
    <WrapperInputStyle>
      <Input  
        placeholder={placeholder}
        value={value}
        onChange={handleChange} 
        {...rests}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      />
    </WrapperInputStyle>
  );
};

export default InputForm;
