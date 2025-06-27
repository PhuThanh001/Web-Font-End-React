import React from 'react'
import { WrapperContent, WrapperTextValue,WrapperLabelText, WrapperTextPrice } from './style'
import { Checkbox, Flex, Rate } from 'antd';

const NavbarComponent = () => {
    const renderContent = (type , options) =>  {
            switch(type)  {
                case 'text' :
                    return options.map((option) => {
                        return(
                         <WrapperTextValue>{option} </WrapperTextValue>
                    )
                    });
                case 'checkbox' :
                    return (
                        <Checkbox.Group style={{ width: '100%' ,display : 'flex' ,flexDirection : 'column' , gap : '12px' }} onChange={onchange}>
                            {options.map((option)=> {
                                    return (
                                        <Checkbox style={{marginLeft : 0}} value={option.value}  >{option.label}  </Checkbox> 
                                    )
                            })}
                        </Checkbox.Group>
                    )
                case 'star' :
                    return options.map((option) => {
                        return (
                            <div style={{ display : 'flex' ,gap : '4px' }} >
                                <Rate style={{fontSize : '12px'}} disabled defaultValue={option} />
                                <span>
                                {`tu  ${option}  sao`} 
                                </span>
                            </div>
                        )
                    })
                    case 'price' :
                    return options.map((option) => {
                        return (
                            <WrapperTextPrice style={{ padding : '4px' ,color :'rgb(56,56, 61)', borderRadius : '10px' ,backgroundColor : '#ffff', width : 'fit-content' }} >
                                {option}
                            </WrapperTextPrice>
                        )
                    })
            }
    }
  
    return (
    <div>
        <WrapperLabelText> Label</WrapperLabelText>
        <WrapperContent> 
        {renderContent('text',['Tu lanh' ,'TV ', 'MAY GIAT'])}  
        {renderContent('checkbox' ,[
            {value: 'a' ,label : 'A' },
            {value: 'a', label : 'B'},
        ])}
        </WrapperContent>
        <WrapperContent>
            {renderContent('star' , [3,4,5])}
        </WrapperContent>
                <WrapperContent>
            {renderContent('price' , ['duoi ','duoi 400','tren '])}
        </WrapperContent>
    </div>
  )
}

export default NavbarComponent