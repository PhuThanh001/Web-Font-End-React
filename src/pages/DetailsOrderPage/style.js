import styled from "styled-components";

export const WrapperNameProduct = styled.div`
    display:flex ;
    align-items: flex-start;
    width: 670px
`
export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  display: flex;
  justify-content: flex-end; /* căn chữ bên phải */
    &:last-child {
        color : red
    }
`
export const WrapperItemLabel = styled.div`
  width: 200px;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
    &:last-child {
        font-weight : bold;
    }
`
export const WrapperProducts = styled.div`
  display: grid;
  grid-template-columns: 610px 200px 200px 200px; // tương ứng với số cột
  align-items: center;
  margin-bottom: 10px;
`
export const WrapperAllPrice = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end
`
export const WrapperHeaderUser = styled.div`
    display: flex;
    align-items: center;
`
export const WrapperInfoUser = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px  ;
`
export const WrapperContentInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px  ;
`
export const WrapperStyleContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px  ;
`

