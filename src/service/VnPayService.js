import axios from "axios";

export const axiosJWT = axios.create({});

// Tạo thanh toán qua VNPay
export const createVnpayPayment = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${import.meta.env.VITE_API_URL}/payment/create_payment_url`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

// Kiểm tra trạng thái thanh toán
export const getVnpayStatus = async (orderId, access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL}/payment/vnpay/status/${orderId}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
