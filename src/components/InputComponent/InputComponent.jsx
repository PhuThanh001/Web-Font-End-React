import React from 'react'
import { Input } from 'antd'

const InputComponent = ({size , placeholder , border ,style, ...rests }) => {
  return (
    <Input
        size = {size}
        placeholder = {placeholder}
        border = {border}
        style ={style}
        {...rests}
    >
    </Input>
  )
}

export default InputComponent