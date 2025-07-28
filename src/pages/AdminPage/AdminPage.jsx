import React from 'react'
import  { useState } from 'react'
import { AppstoreOutlined, MailOutlined, ProductOutlined, SettingOutlined, UserOutlined  } from '@ant-design/icons';
import { Menu } from 'antd';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponet';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';
const AdminPage = () => {
  const items = [
  {
    key: 'user',
    icon: <UserOutlined />,
    label: 'Người dùng ',
  },
  {
    key: 'product',
    icon: <ProductOutlined />,
    label: 'Sản Phẩm',
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: 'Navigation Three',
  },
];
const getLevelKeys = items1 => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach(item => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
  const levelKeys = getLevelKeys(items);
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const onOpenChange = openKeys => {
    const currentOpenKey = openKeys.find(key => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter(key => key !== currentOpenKey)
        .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter(key => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  const [keyselected, setKeyselected] = useState(' ');
  const RenderPage = (key) => {
    switch(key) {
      case 'user':
      return (
          <AdminUser/>
      );
      case 'product':
        return (
          <AdminProduct/>
        )
      default:
        <></>
    }
  }
  const handleOnClick = ({ key}) => {
      setKeyselected(key);
      console.log({ key})
  }
  return (
    <>
    <HeaderComponent isHiddenSearch isHiddentCart/>
    <div style={{display: 'flex'}}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256,
      boxShadow : '1px 1px 2px #ccc' }}
      items={items}
      onClick={handleOnClick}
    />
    <div style={{flex : 1, padding: '15px'}}>
        {RenderPage(keyselected)}
    </div>
    </div>
    </>
  )
}
export default AdminPage