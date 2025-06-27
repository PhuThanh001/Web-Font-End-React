import React from "react";
import styled from "styled-components";
import { Col, Image, InputNumber } from "antd";


export const WrapperStyleImageSmall = styled(Image)`
        height : 5px;
        width  : 1000px;
`
export const WrapperStyleColImage = styled(Col)`
        flex-basis : unset ;
        display : flex ;
`   
export const WrapperStyleNameProduct = styled.h1`
        margin : 0px 0px 4px;
        color : rgb(36,36,36) ;
        font-size :  24px ;
        font-weight : 300;
        line-height : 32px ;
        word-break : break-word;
`
export const WrapperStyleTextSell = styled.span`
        font-size :  15px;
        line-height : 24px;
        background : rgb(120 ,120,120);
`
export const WrapperPriceProduct = styled.div`
        background : rgb(250,250,250 );
        border-radius : 4px 
`
export const WrapperPriceTextProduct = styled.h1`
        font-height : 4px;
        line-height : 40px;
        margin-right : 8px;
        font-weight : 500 ;
        padding : 10px ;
        margin-top : 10px;
`
export const WrapperAddressProduct = styled.div`
        span.address {
            text-decoration : underline;
            font-size : 15px;
            line-height : 24px;
            font-weight : 500;
            white-space : nowrap ;
            overflow : hidden ;
            text-overflow : ellipsisl
        };
        span.change-address {
            color : rgb(11 , 116 , 229 );
            font-size : 16px ;
            line-height : 24px;
            font-weight : 500 ;
            flex-shrink : 0;
        }
`
export const WrapperQualityTextProduct = styled.div`
        display : flex;
        gap : 4px;
        align-items : center;
        boder-radius : 4px ;
        border  : 1px solid #ccc ;
        width : 100px
`
export const WrapperBtnProduct = styled.span`
        border : 1
`
export const WrapperInputNumber = styled(InputNumber)`
        &.ant-Input-number.ant-input-number-sm{
            width : 40px;
            border-top : none;
            border-bottom : none;
        }
`