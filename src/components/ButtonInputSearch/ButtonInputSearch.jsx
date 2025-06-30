import React from "react";
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputComponent from "../InputComponent/InputComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    PlaceHolder,
    textButton,
    bordered,
    backgroundColorInput = '#fff',
    backgroundColorButton = 'rgb(13, 92, 182)',
    colorButton = '#fff',
  } = props;

  return (
    <div style={{ display: 'flex' }}>
      <InputComponent
        size={size}
        placeholder={PlaceHolder}
        borderless={bordered} // đã đúng
        style={{ backgroundColor: backgroundColorInput }}
      />
      <ButtonComponent
        size={size}
        icon={<SearchOutlined color = "colorButton" style={{color : '#fff'}} />}
        styleButton={{ background : backgroundColorButton,  bordered : !bordered && 'none' }}  
        textButton={ textButton}
        styleTextButton={{color : colorButton}}
      > 
        <span style={{ color: colorButton }}>{textButton}</span>
      </ButtonComponent>
    </div>
  );
};

export default ButtonInputSearch;
