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
export const ProductRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 200px 200px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  gap: 12px;
  margin-right:800px
`;
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
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`;
export const WrapperInfoUser = styled.div`
  flex: 1;
  background: #ffffffff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.1);
`;
export const WrapperContentInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px  ;
`
export const WrapperStyleContent = styled.div`
    width: 100%
`
export const GridHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 200px 200px; /* first column flexible */
  align-items: center;
  font-weight: 700;
  border-bottom: 1px solid #eee;
  gap: 12px;
  margin-bottom: 10px;
  margin-right:550px
`
export const TotalsRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 200px 200px 200px;
    margin-top: 20px
`

