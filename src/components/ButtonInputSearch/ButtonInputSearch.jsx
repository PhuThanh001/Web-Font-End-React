import React from "react";
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputComponent from "../InputComponent/InputComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder, // ✅ viết đúng camelCase
    bordered = true,
    backgroundColorInput = '#e6e4ecff',
    backgroundColorButton = 'rgba(136, 8, 8, 1)',
    colorButton = '#d7d7dfff', // ✅ default trắng để dễ đọc
    ...rest // ✅ gom lại props còn lại
  } = props;
  return (
    <div style={{ display: 'flex' }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        borderless={!bordered} // ✅ đúng logic
        style={{ backgroundColor: backgroundColorInput }}
        {...rest}
      />
    <ButtonComponent
      size="large"
      icon={<SearchOutlined style={{ color: colorButton }} />}
      textButton="Tìm kiếm" 
      styleButton={{ backgroundColor: "blue", color: "white", border: "1px solid blue" }}  
      styleTextButton={{ fontWeight: 500 }}
    />
    </div>
  );
};

export default ButtonInputSearch;
