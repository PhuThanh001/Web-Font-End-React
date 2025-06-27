import React from "react";
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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
      <Input
        size={size}
        placeholder={PlaceHolder}
        borderless={bordered} // đã đúng
        style={{ backgroundColor: backgroundColorInput }}
      />
      <Button
        size={size}
        icon={<SearchOutlined style={{ color: colorButton }} />}
        style={{
          backgroundColor: backgroundColorButton,
          border: bordered ? undefined : 'none',
        }}
      >
        <span style={{ color: colorButton }}>{textButton}</span>
      </Button>
    </div>
  );
};

export default ButtonInputSearch;
