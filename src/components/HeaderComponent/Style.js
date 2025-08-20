import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.div`
  width: 100%;
  background-color:rgb(14, 63, 136);
  padding: 10px 0 ;
  align-items : center;
  gap : 16px ;
  flex-wrap : nowrap;
`;
export const WrapperTextHeader = styled.span`
    font-size : 18px ; 
    color : #fff ;
    font-weight : bold; 
    text-align : left;
`
export const WrapperHeaderAccount = styled.div`
    display : flex;
    align-items : center;
    color : #fff;
    gap : 10px ;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size : 12px ;
    color : #fff;
    white-space : nowrap
`
export const WrapperIconHeader = styled.span`
    font-size : 30px;
    color : #fff;
`
export const WrapperContentPopUp = styled.p`
    cursor: pointer;
    &:hover {
        color : rgb(26,148,255);
    }
`