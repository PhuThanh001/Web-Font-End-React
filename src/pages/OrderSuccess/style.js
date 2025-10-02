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
  justify-content: center
`
export const WrapperContainer = styled.div`
  width: 100%;
`
export const WrapperValuee = styled.div`
  background: rgb(240, 248, 255);
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  margin-top: 4px;
  color: #000;
  margin-top: 4px;
`
export const WrapperValue = styled.div`
  background: #e6f2ff; /* xanh nhạt hơn */
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  margin-top: 6px;
  color: #003366; /* xanh đậm */
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

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

export const WrapperRadio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 0;
`
export const WrapperInfo = styled.div`
    padding: 17px 20px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    width: 100%;
`
export const WrapperItemOrderInfo = styled.div`
    padding: 17px 20px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    width: 100%;
    display: flex;
    justify-content:center;
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
  display: inline-block; /* Sửa từ display: content thành inline-block */
  width: 40px; /* Tăng width để hiển thị số */
  height: 32px; /* Tăng height cho dễ nhìn */
  text-align: center; 
  border: none; 
  border-radius: 4px; 
  padding: 0 8px; 
  font-size: 18px; 
  font-weight: 100;

  &:focus {
    outline: none; /* Loại bỏ viền focus mặc định */
    box-shadow: none; /* Loại bỏ shadow khi focus */
  }

/* Ẩn viền khi hover (nếu cần) */
  &:hover {
    border: none;
  }

  /* Ẩn nút tăng/giảm nếu không cần */
  .ant-input-number-handler-wrap {
    display: none;
  }
`;

