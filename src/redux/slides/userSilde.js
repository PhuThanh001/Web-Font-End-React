import { createSlice } from '@reduxjs/toolkit'
import { Avatar } from 'antd';




const initialState = JSON.parse(localStorage.getItem('user')) || {
  email: '',
  name: '',
  access_token: '',
  address: '',
  city : '' ,
  avatar: '',
  id: '',
  isLoading: true,
  isSuccess:true,
  isAdmin:true
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
updateUser: (state, action) => {
  const {
    name = '',
    email = '',
    access_token = '',
    city = '' ,
    address = '',
    avatar = '',
    phone = '',
    _id = '',
    isAdmin = true
  } = action.payload;

  state.name = name || email;
  state.email = email;
  state.access_token = access_token;
  state.address = address;
  state.city = city;
  state.avatar = avatar;
  state.phone = phone;
  state.id = _id;
  state.isAdmin = isAdmin;
  // ✅ Lưu user vào localStorage
      localStorage.setItem('user', JSON.stringify(state));
},
resetUser: (state) => {
  state.name = '';
  state.email = '';
  state.phone = '';
  state.access_token = '';
  state.address = '';
  state.city= '';
  state.avatar = '';
  state.id = '';
  state.isAdmin = false;
  // ✅ Xóa user khỏi localStorage
      localStorage.removeItem('user');
},
    },
  },
)

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer

