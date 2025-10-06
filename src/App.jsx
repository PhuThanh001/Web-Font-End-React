import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { routes } from './routes'
import { Fragment, useEffect, useState } from 'react'
import LayoutWithHeader from './components/Layout/LayoutWithHeader'; // <-- dùng layout mới
import axios from 'axios';
import { updateUser } from './redux/slides/userSilde'
import  {isjsonstring}  from './utils';
import { jwtDecode } from 'jwt-decode'
import * as UserService from './service/UserService';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/reset.css'; // Với Antd v5
import Loading from './components/LoadingComponent/loading'

function App() {
  const dispatch = useDispatch();
  const [isLoading , setIsLoading] = useState(false)
  const user = useSelector((state)  => state.user)

    useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        // Debug token trong localStorage
        const rawToken = localStorage.getItem("access_token");
        console.log("=== raw access_token ===", rawToken);

        const { storageData, decoded } = handleDecoded();
        console.log("=== decoded token ===", decoded);
        if (decoded?.id) {
           await handleGetDetailsUser(decoded.id, storageData);
        }
          
      } catch (err) {
        console.error("❌ Lỗi khi khởi tạo user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [dispatch]); 


  // const handleDecoded = () => {
  //   let storageData = localStorage.getItem('access_token');
  //   let decoded = {};
  //     if (storageData && isjsonstring(storageData)) {
  //       storageData = JSON.parse(storageData);
  //       decoded = jwtDecode(storageData);
  //     }
  //     return { storageData, decoded };
  // }
const handleDecoded = () => {
  let storageData = localStorage.getItem('access_token');
  let decoded = {};

  // ✅ Chặn các giá trị không hợp lệ
  if (
    storageData &&
    storageData !== "undefined" &&
    storageData !== "null" &&
    isjsonstring(storageData)
  ) {
    storageData = JSON.parse(storageData);
    decoded = jwtDecode(storageData);
  }

  return { storageData, decoded };
};
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const CurrentTime = new Date();
    const { decoded } = handleDecoded();
    if (decoded?.exp < CurrentTime.getTime() / 1000) {
       const data = await UserService.refreshToken()
       config.headers['token'] = `Bearer ${data?.access_token}`;         
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  });
  const handleGetDetailsUser = async (id , token) => {
    const res =  await UserService.getUserDetails(id, token);
    dispatch(updateUser(res.data));
    return res;
  }
  return (
      <div style={{ width: '100%' }}>
      <Loading isPending={isLoading}>
          <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const isCheckAuth = !route.isPrivate || user.isAdmin;
            const Layout = route.isShowHeader ? LayoutWithHeader : Fragment;

            // Chỉ render Route nếu isCheckAuth là true
            return isCheckAuth ? (
              <Route
                key={route.path}
                path={route.path} // Sử dụng trực tiếp route.path
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            ) : null; // Bỏ qua Route nếu isCheckAuth là false
          })}
        </Routes>
      </Loading>

      </div>
    );
}

export default App;

