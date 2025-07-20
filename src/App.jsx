import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent/HeaderComponet'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { routes } from './routes'
import { Fragment, useEffect } from 'react'
import LayoutWithHeader from './components/Layout/LayoutWithHeader'; // <-- dùng layout mới
import axios from 'axios';

function App() {
//   useEffect(() => {
//     fetchApi();
//   }, []);
// console.log('VITE_API_URL', import.meta.env.VITE_API_URL);
// const fetchApi = async () => {
//   const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll`);
//   console.log('res', res);
// };
  return (
    <div style={{ width: '100%' }}>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? LayoutWithHeader : Fragment;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  )
}
export default App

