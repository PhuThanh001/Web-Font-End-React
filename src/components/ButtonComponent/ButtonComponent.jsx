import React from 'react'
import {Button} from 'antd'

const ButtonComponent = ({size , styleButton , styleTextButton , TextButton, disabled , ...rests}) => {
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
      <span style={styleTextButton}>{TextButton}</span>
    </Button>
  )
} 
export default ButtonComponent