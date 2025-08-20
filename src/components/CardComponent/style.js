import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardName = styled(Card)`
    width : 200px;
    & img {
        height : 200px;
        width : 200px;
    },
    postition : relation ;
`
export const WrapperImageStyle = styled.img`
        top : -1px ;
        left : -1px;
        border-top-left-radius: 3px ;
        position : absolute ;
        height : 14px;
        weight : 68px;
`
export const StyleNameProduct = styled.div`
    font-weight : 400; 
    font-size : 12px;
    line-height : 12px;
    color :  rgb()
`
export const WrapperReportText = styled.div`
    font-size : 11px;
    line-height : normal;
    color :rgb (128,128,137);
    align-items : center;
    margin : 6px 0 0px; 
`
export const WrapperPriceText = styled.div`
    display : flex;
    color :rgb(255 ,66 ,78);
    font-size : 16px;
    font-weight : 500; 
`
export const WrapperDiscountText = styled.span`
    color :rgb(255 ,66 ,78);
    font-size : 12px;
    font-weight : 500;
`
export const WrapperProducts = styled.div`
    display : 'flex';
    justify-Content : center;
    gap : 15px ;
    margin-top : 20px;
    flex-wrap : wrap ;
`

