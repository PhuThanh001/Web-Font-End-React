import React from 'react'
import {Button} from 'antd'

const ButtonComponent = ({size , styleButton , styleTextButton , textButton, disabled , ...rests}) => {
  return (
    <Button
      disabled={disabled}
      size={size}
      style={{
        ...styleButton,
        backgroundColor: disabled ? '#ccc' : styleButton?.backgroundColor
      }}
      {...rests}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  )
} 
export default ButtonComponent