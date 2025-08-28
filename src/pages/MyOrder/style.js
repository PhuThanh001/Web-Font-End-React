import { Col ,InputNumber } from "antd"
import styled from "styled-components"

export const WrapperItemOrder = styled.div`
  display: flex;            
  align-items: center;
  padding: 15px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
  min-height: 60px;
`
export const WrapperHeaderItem = styled.div`
`
export const WrapperContainer = styled.div`
    weight: 100% ;
    background-color : #f5f5fa
`
export const WrapperStyleHeaderDelivery = styled.div`
  background: rgb(255 ,255 ,255);
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
  min-height: 60px;
  span {
    color: rgb(255 ,255 ,255);
    font-weight: 400 ;
    font-size: 13px;
  };
  margin-bottom: 4px;
`

export const WrapperStyleHeader = styled.div`
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
  min-height: 60px;
`
export const WrapperListOrder = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
  min-height: 60px;
`
export const WrapperLeft = styled.div`
  width: 100%; 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 20px; 
  background-color: #fff; 
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
  min-height: 80vh; 
  overflow-y: auto; 
`
export const WrapperRights = styled.div`
  width: 350px;
  min-height: 250px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
`;

export const WrapperInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

export const RowInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  .value {
    font-weight: bold;
    color: #000;
  }
`;

export const WrapperTotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #ccc;
  font-size: 16px;
  font-weight: bold;

  .total-value {
    color: rgb(255, 66, 78);
  }
`;
export const WrapperCountOrder = styled.div`
    display: flex;
    flex-direction: row;
    width: 84px;
    border: 1px solid #ccc;
    border-radius: 4px;
`
export const WrapperRight = styled.div`
    width: 320px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`
export const WrapperInfo = styled.div`
    padding: 17px 20px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    width: 100%;
`
export const WrapperTotal = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between; padding: 17px 20px;
    background: #fff; border-bottom-right-radius: 6px; border-bottom-left-radius: 6px;
`
export const WrapperPriceDiscount = styled.div`
    color :rgb(255 ,66 ,78);
    font-size : 16px;
    font-weight : 500; 
`
export const WrapperInputNumber = styled(InputNumber)`
  display : content;
  width: 50px;
  height: 28px;
`;

