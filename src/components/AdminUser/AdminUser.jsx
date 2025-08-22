import React, { useState, useRef ,useEffect  } from 'react';
import { WrapperHeader,WrapperUpLoadFile } from './style';
import { PlusCircleFilled ,SearchOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query'
import Input from 'antd/es/input/Input';
import { Button, Modal, Form, Upload, Spin, Drawer,App,Space } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import { useSelector } from 'react-redux';
import InputComponent from '../InputComponent/InputComponent';
import ModalComponent from '../ModalComponent/ModalComponent'; // kiểm tra lại đường dẫn nếu khác
import DrawComponent from '../DrawComponent/DrawComponent'; // kiểm tra lại đường dẫn nếu khác
import Loading from '../LoadingComponent/loading';
import { getBase64 } from '../../utils';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService  from '../../service/UserService';
import imageCompression from 'browser-image-compression';
import { Excel } from 'antd-table-saveas-excel';



const AdminUser = () => {
  const { message: messageApi } = App.useApp(); // Lấy message từ context
  const [isModalOpen , setIsModelOpen] = useState(false)
  const [rowSelected , SetRowSelected] = useState('')
  const [isOpenDraw, SetIsOpenDraw] = useState(false)
  const [isLoadingUpdate , SetIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete , SetIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  
  const [stateUser , setStateUser] = useState({
    name: '',
    email:'',
    phone:'',
    isAdmin: false,
  })
  const [stateUserDetails , setStateUserDetails] = useState({
    name: '',
    email:'',
    phone:'',
    isAdmin:false,
  })
  // const mutation = useMutationHook((data) => {
  //   const {
  //     name ,
  //     email,
  //     phone,
  //     isAdmin
  //   } = data
  //   const res = UserService.CreateUser({
  //     name,
  //     email,
  //     phone,
  //     isAdmin,
  //   })
  //   return res
  // })
  const mutationUpdate = useMutationHook(async (data) => {
    console.log('data' , data)
    const {
      id ,
      token,
      ...rests
    } = data
    const res = await UserService.updateUser(
      id,
      {...rests}, token)
    return res
  },
)
  const mutationDelete = useMutationHook(async (data) => {
    const {
      id ,
      token
    } = data
    const res = await UserService.DeleteUser(
      id,
      token)
    return res
  },
)
    const getAllUser = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    console.log('product ', res)
    return res
  }
  //nếu hàm không được gọi thì console.log() không được thực thi
  const fetchGetDetailsUser = async () =>{
    const res = await UserService.getUserDetails(rowSelected)
  console.log('🟢 API Response:', res);
  console.log('🔵 res.data:', res?.data);    
  if(res?.data){
      setStateUserDetails({
        name: res?.data.data.name,
        email: res?.data.data.email,
        phone: res?.data.data.phone,
        isAdmin: res?.data.data.isAdmin,
      })
    }
    SetIsLoadingUpdate(false)
  } 
  console.log('stateProduct' , stateUserDetails)
  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form , stateUserDetails] )
  //sửa lỗi dòng này là phải click vô ô vuông chứ không nó không gọi được hàm fetchGetDetailsUser
  useEffect(() => 
    {
      if(rowSelected) {
        fetchGetDetailsUser(rowSelected)
      }
    }, [rowSelected])  

  console.log('StateProduct' , stateUserDetails)
  const handleDetailsUser = () => {
      if(rowSelected) {
      // SetIsLoadingUpdate(true)
      fetchGetDetailsUser()
    }
    console.log('rowSelected' , rowSelected)
    SetIsOpenDraw(true)
  }  
  const handleDeleteUser = () => {
    mutationDelete.mutate({id:  rowSelected , token: user?.access_token}),{
      onSettled: () => {
        queryUser.refetch()
      }
    }
  }
  const { data:dataUpdate, isPending:isPendingUpdate , isError:isErrorUpdate , isSuccess:isSuccessUpdate } = mutationUpdate
  const { data:dataDelete, isPending:isPendingDelete , isError:isErrorDelete , isSuccess:isSuccessDelete } = mutationDelete

  const queryUser = useQuery({ queryKey: ['user'], queryFn: getAllUser });
  const {isLoading: isLoadingUser , data: users} = useQuery({queryKey: ['users'] , queryFn: getAllUser})
  console.log('danh sach người dùng' , users)

  const renderAction = () => {
    return (
      <div>
          <DeleteOutlined style={{color : 'red' , fontSize: '30px', cursor:'pointer'}} onClick={() => SetIsModalOpenDelete(true)}/>
          <EditOutlined style={{color: 'orange' , fontSize:'30px' , cursor:'pointer' }} onClick={handleDetailsUser}/>
      </div>
    )
  }
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters();
    //setSearchText('');
  };
const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => {
            var _a;
            return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
          }, 100);
        }
      },
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            render: (test) => <a>{test}</a>, 
            sorter: (a,b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (test) => <a>{test}</a>, 
            sorter: (a,b) => a.name.length - b.name.length,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters:[
            {
              text: "True",
              value: 'true'
            },
            {
              text: 'False',
              value: false
            }
          ]
        },
        {
          title: 'Phonne',
          dataIndex: 'phone',
          sorter: (a, b) => a.phone - b.phone,
          ...getColumnSearchProps('phone')
        },
        {
            title: 'action',
            dataIndex: 'action',
            render: renderAction
        }
    ];
  const dataTable = users?.data?.length && users?.data?.map((user) => {
     return{...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE'} 
        }) 
        console.log('dataTable', dataTable)
    useEffect(() => {
      console.log('isSuccess:', isSuccessUpdate, 'isError:', isErrorUpdate);
      if (isSuccessUpdate && dataUpdate?.status ==='ok') {
        messageApi.success('Cập nhật thành công!');
        handleCloseDrawer()
      } else if (isErrorUpdate) {
        messageApi.error('Cập nhật thất bại!');
      }
    }, [isSuccessUpdate, isErrorUpdate, messageApi]);
    useEffect(() => {
      console.log('isSuccess:', isSuccessDelete, 'isError:', isErrorDelete);
      if (isSuccessDelete && dataDelete?.status ==='ok') {
        messageApi.success('Xóa thành công!');
        handleCloseDrawer()
      } else if (isErrorDelete) {
        messageApi.error('Cập nhật thất bại!');
      }
    }, [isSuccessDelete, isErrorDelete, messageApi]);
    const handleCloseDrawer = () => {
    SetIsOpenDraw(false);
    setStateUser({
      name:'',
      price:'',
      description:'',
      rating:'',
      image:'',
      type:'',
      CountInStock:''
    })
    form.resetFields()
  }
  const [avatar, setAvatar] = useState('');
  const  handleCancelDelete = () => {
    SetIsModalOpenDelete(false)
  }
  const handleCancel = () => {
    setIsModelOpen(false);
    setStateUser({
      name:'',
      email:'',
      phone:'',
      isAdmin:false,
    })
    form.resetFields()
  }

  const handleOnChange = (e) => {
      setStateUser({
        ...stateUser,
        [e.target.name]: e.target.value
      })
  }
  const handleOnChangeDetails = (e) => {
      console.log('check' , e.target.name ,e.target.value)
      setStateUserDetails({
        ...stateUserDetails,
        [e.target.name]: e.target.value
      })
  } 
  const OnUpdateProduct = () => {
      mutationUpdate.mutate({id: rowSelected , token : user?.access_token , ...stateUserDetails} , 
        {onSettled: () => {
            queryUser.refetch()
      }
  })
  }
const handleOnchangeAvatar = async (uploadData) => {
  if (!uploadData?.fileList?.length) return;
  const file = uploadData.fileList[0].originFileObj;
  if (file.size > 2 * 1024 * 1024) {
    console.error('File quá lớn, vui lòng chọn file nhỏ hơn 2MB');
    return;
  }
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 200,
      quality: 0.5,
      fileType: 'image/jpeg', // Thêm dòng này nếu muốn chuyển sang JPEG
      useWebWorker: true,
    });
    const preview = await getBase64(compressedFile);
    setStateUser((prev) => ({ ...prev, image: preview }));
    console.log('preview length:', preview.length);
  } catch (error) {
    console.error('Lỗi khi nén hoặc chuyển file sang base64:', error);
  }
};

const handleOnchangeAvatarDetails = async (uploadData) => {
  if (!uploadData?.fileList?.length) return;
  const file = uploadData.fileList[0].originFileObj;
  if (file.size > 2 * 1024 * 1024) {
    console.error('File quá lớn, vui lòng chọn file nhỏ hơn 2MB');
    return;
  }
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 200,
      quality: 0.5,
      fileType: 'image/jpeg', // Thêm dòng này nếu muốn chuyển sang JPEG
      useWebWorker: true,
    });
    const preview = await getBase64(compressedFile);
    setStateUserDetails((prev) => ({ ...prev, image: preview }));
    console.log('preview length:', preview.length);
  } catch (error) {
    console.error('Lỗi khi nén hoặc chuyển file sang base64:', error);
  }
};
return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button
          style={{
            height: '150px',
            width: '150px',
            borderRadius: '6px',
            borderStyle: 'dashed'
          }}
          onClick={() => setIsModelOpen(true)}
        >
          <PlusCircleFilled style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div>
      <TableComponent columns={columns} isLoading={isLoadingUser} data={dataTable}  onRow={(record , rowIndex) => {
      return {
        onClick: event => {
          SetRowSelected(record._id)
          console.log("Clicked row id: ", record._id);
        }
      }
    }} />
    </div>
      {/* <Modal
        title="Tạo Sản Phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isPending={isPendingUpdate}>
          <Form
            name="name"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="on"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <InputComponent value={stateUser.name} onChange={handleOnChange} name="name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your Type!' }]}
            >
              <InputComponent value={stateUser.type} onChange={handleOnChange} name="email" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your Count In Stock!' }]}
            >
              <InputComponent value={stateUser.countInStock} onChange={handleOnChange} name="phone" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your Description!' }]}
            >
              <InputComponent value={stateUser.description} onChange={handleOnChange} name="description" />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Please input your Image!' }]}
            >
              <WrapperUpLoadFile onChange={handleOnchangeAvatar} maxCount={1} beforeUpload={() => false}>
                <Button>Select File</Button>
                {stateUser?.image && (
                  <img
                    src={stateUser?.image}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px'
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUpLoadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal> */}
      <DrawComponent title="chi tiết sản phẩm" isopen={isOpenDraw} onClose={() => SetIsOpenDraw(false)} width="90%">
        <Loading isPending={isLoadingUpdate}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600 }}
            onFinish={OnUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your Type!' }]}
            >
              <InputComponent value={stateUserDetails.type} onChange={handleOnChangeDetails} name="email" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your Count In Stock!' }]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
            </Form.Item>
          <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Please input your Image!' }]}
            >
              <WrapperUpLoadFile onChange={handleOnchangeAvatar} maxCount={1} beforeUpload={() => false}>
                <Button>Select File</Button>
                {stateUser?.avatar && (
                  <img
                    src={stateUserDetails?.avatar}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px'
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUpLoadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawComponent>
      <ModalComponent
        title="Xóa Người Dùng "
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        <div>Bạn có chắc muốn xóa tài khoản này không?</div>
      </ModalComponent>
    </div>
  );
};
const WrappedProfilePage = () => (
  <App>
    <AdminUser />
  </App>
);
export default WrappedProfilePage;