import { Input } from "antd";
import React, { useState } from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
  const [valueInput, setValueInput] = useState('');
  const { placeholder = 'Nhập text', ...rests } = props;

  const handleOnChangeEmail = (e) => {
    setValueInput(e.target.value);
    console.log(e.target.value); // Log the input value
    if (rests.onChange) {
      rests.onChange(e); // Call the onChange prop if it exists
    }
  };
  const handleOnChangeInput = (e) => { 
    props.onChange(e.target.value); // Call the HandleOnChange prop if it exists
  } 

  return (
    <WrapperInputStyle>
      <Input  
        placeholder={placeholder}
        value={valueInput}
        onChange={handleOnChangeInput}
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
