import React, { useEffect, useRef, useState } from 'react'
import {useQuery} from '@tanstack/react-query'
import TableComponent from '../TableComponent/TableComponent'
import { Descriptions, Table ,Modal, Space, Select  } from 'antd';
import { WrapperHeader ,WrapperUpLoadFile  } from './style';
import {DeleteOutlined, PlusCircleFilled,EditOutlined , SearchOutlined} from '@ant-design/icons'
import {Button ,App,Form  } from 'antd'
import { useSelector } from 'react-redux';
import Input from 'antd/es/input/Input';
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as ProductService  from '../../service/ProductService';
import Loading from '../LoadingComponent/loading';
import DrawComponent from '../DrawComponent/DrawComponent';
import imageCompression from 'browser-image-compression';
import ModalComponent from '../ModalComponent/ModalComponent';
import Highlighter from 'react-highlight-words';


const AdminProduct = () => {
  const { message: messageApi } = App.useApp(); // Lấy message từ context
  const [isModalOpen , setIsModelOpen] = useState(false)
  const [rowSelected , SetRowSelected] = useState('')
  const [isOpenDraw, SetIsOpenDraw] = useState(false)
  const [isLoadingUpdate , SetIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete , SetIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [form] = Form.useForm();
  const [typeSelect , setTypeSelect] = useState('')
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [stateProduct , setStateProduct] = useState({
    name: '',
    price:'',
    type:'',
    description:'',
    rating:'',
    image:'',
    countInStock:'',
    newType:''
  })
  const [stateProductDetails , setStateProductDetails] = useState({
    name: '',
    price:'',
    type:'',
    description:'',
    rating:'',
    image:'',
    CountInStock:''
  })
  const mutation = useMutationHook((data) => {
    const {
      name ,
      price ,
      description ,
      rating ,
      countInStock :countInStock,
      image,
      type,
    } = data
    const res = ProductService.CreateProduct({
      name,
      price,
      description,
      rating ,
      countInStock ,
      image,
      type
    })
    return res
  })
  const mutationUpdate = useMutationHook(async (data) => {
    console.log('data' , data)
    const {
      id ,
      token,
      ...rests
    } = data
    const res = await ProductService.UpdateProduct(
      id,
      token,
      {...rests})
    return res
  },
)
  const mutationDelete = useMutationHook(async (data) => {
    const {
      id ,
      token
    } = data
    const res = await ProductService.DeleteProduct(
      id,
      token)
    return res
  },
)
  const mutationDeleteMany = useMutationHook(async (data) => {
    const {
      token,
      ...ids
    } = data
    const res = await ProductService.Delete_many_product(
      token,
      ids,
)
    return res
  },
)
    const getAllProducts = async () => {
    const res = await ProductService.GetAllProduct()
    console.log('product ', res)
    return res
  }
  const fetchGetDetailsProduct = async () =>{
    const res = await ProductService.GetDetailsProduct(rowSelected)
    if(res?.data){
      setStateProductDetails({
        name: res?.data.name,
        price: res?.data.price,
        type: res?.data.type,
        description: res?.data.description,
        rating: res?.data.rating,
        image: res?.data.image,
        countInStock: res?.data.CountInStock
      })
    }
    SetIsLoadingUpdate(false)
  } 
  console.log('stateProduct' , stateProductDetails)
  useEffect(() => {
    form.setFieldsValue(stateProductDetails)
  }, [form , stateProductDetails] )
  
  useEffect(() => 
    {
      if(rowSelected) {
        fetchGetDetailsProduct(rowSelected)
      }
    }, [rowSelected])  

  console.log('StateProduct' , stateProductDetails)
  const handleDetailsProduct = () => {
      if(rowSelected) {
      // SetIsLoadingUpdate(true)
      fetchGetDetailsProduct()
    }
    console.log('rowSelected' , rowSelected)
    SetIsOpenDraw(true)
  }  
  const handleChangeSelect = (value) => {
        setStateProduct({
        ...stateProduct,
        type:value
      })
  }  
  console.log('value={stateProduct.type}', stateProduct.type )

  const handleDeleteProduct = () => {
    mutationDelete.mutate({id:  rowSelected , token: user?.access_token}),{
      onSettled: () => {
        queryProduct.refetch()
      }
    }
  }
  const handleDeleteManyProduct = (ids) => {
    console.log('token' , user)
    mutationDeleteMany.mutate({id:  ids , token: user?.access_token}),{
      onSettled: () => {
        queryProduct.refetch()
      }
    }
  }
const FetchAllTypeProduct = async () => {
  const res = await ProductService.get_all_type_product();
  console.log("📌 API trả về:", res);
  return res;
}
  const { data, isPending , isError , isSuccess } = mutation
  const { data:dataUpdate, isPending:isPendingUpdate , isError:isErrorUpdate , isSuccess:isSuccessUpdate } = mutationUpdate
  const { data:dataDelete, isPending:isPendingDelete , isError:isErrorDelete , isSuccess:isSuccessDelete } = mutationDelete
  const { data:dataDeleteMany, isPending:isPendingDeleteMany , isError:isErrorDeleteMany , isSuccess:isSuccessDeleteMany } = mutationDeleteMany

  const TypeProduct = useQuery({ queryKey: ['type-products'], queryFn: FetchAllTypeProduct });
  console.log('typeProduct' , TypeProduct)
  const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts });
  console.log('sản phẩm nè' , queryProduct)
  const {isLoading: isLoadingProduct , data: products} = useQuery({queryKey: ['products'] , queryFn: getAllProducts})

  const renderAction = () => {
    return (
      <div>
          <DeleteOutlined style={{color : 'red' , fontSize: '30px', cursor:'pointer'}} onClick={() => SetIsModalOpenDelete(true)}/>
          <EditOutlined style={{color: 'orange' , fontSize:'30px' , cursor:'pointer' }} onClick={handleDetailsProduct}/>
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
          title: 'price',
          dataIndex: 'price',
          sorter: (a, b) => a.price - b.price,
          filters: [
            {
              text: '>= 50',
              value: '=>',
            },
            {
              text: '<= 50',
              value: '<=',
            },
          ],
          onFilter: (value, record) => {
            console.log('value' , {value, record})
            if(value === '>='){
            return record.price >= 50
          } 
            return record.price <= 50
        },
        },
        {
            title: 'rating',
            dataIndex: 'rating',
            sorter: (a , b ) => a.price - b.price,
            filters: [
            {
              text: '>= 3',
              value: '=>',
            },
            {
              text: '<= 3',
              value: '<=',
            },
          ],
          onFilter: (value, record) => {
            console.log('value' , {value, record})
            if(value === '>='){
            return Number(record.rating) >= 3
          } 
            return Number(record.rating) <= 3
        },
        },   
        {
            title: 'Type',
            dataIndex: 'type'
        },
        {
            title: 'action',
            dataIndex: 'action',
            render: renderAction
        }
    ];
  const dataTable = products?.data?.data?.length && products?.data?.data?.map((product) => {
     return{...product, key: product._id} 
        }) 
        console.log('dataTable', dataTable)
    useEffect(() => {
      console.log('isSuccess:', isSuccess, 'isError:', isError);
      if (isSuccess && data?.status ==='ok') {
        messageApi.success('Cập nhật thành công!');
        handleCloseDrawer()
      } else if (isError) {
        messageApi.error('Cập nhật thất bại!');
      }
    }, [isSuccess, isError, messageApi]);
    useEffect(() => {
      console.log('isSuccess:', isSuccessDelete, 'isError:', isErrorDelete);
      if (isSuccessDelete && data?.status ==='ok') {
        messageApi.success('Xóa thành công!');
        handleCloseDrawer()
      } else if (isError) {
        messageApi.error('Cập nhật thất bại!');
      }
    }, [isSuccess, isError, messageApi]);
    useEffect(() => {
      console.log('isSuccess:', isSuccessDeleteMany, 'isError:', isErrorDeleteMany);
      if (isSuccessDeleteMany && data?.status ==='ok') {
        messageApi.success('xóa thành công!');
        handleCloseDrawer()
      } else if (isErrorDeleteMany) {
        messageApi.error('xóa thất bại!');
      }
    }, [isSuccess, isError, messageApi]);
    const handleCloseDrawer = () => {
    SetIsOpenDraw(false);
    setStateProduct({
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
    setStateProduct({
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
  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      countInStock: stateProduct.countInStock,
    }
    mutation.mutate(params,
      {onSettled: () => {
            queryProduct.refetch()
      }
  })
  }
  const handleOnChange = (e) => {
      setStateProduct({
        ...stateProduct,
        [e.target.name]: e.target.value
      })
  }
  const handleOnChangeDetails = (e) => {
      console.log('check' , e.target.name ,e.target.value)
      setStateProductDetails({
        ...stateProductDetails,
        [e.target.name]: e.target.value
      })
  } 
  console.log('user' , user)
  console.log('rowsellll' , rowSelected)
  console.log('stateproduccc' , stateProductDetails)
  const OnUpdateProduct = () => {
      mutationUpdate.mutate({id: rowSelected , token : user?.access_token , ...stateProductDetails} , 
        {onSettled: () => {
            queryProduct.refetch()
      }
  })
  }
  // const handleOnchangeAvatar = async (uploadData) => {
  //   console.log('🔥 uploadData:', uploadData);
  //   if (!uploadData || !uploadData.fileList || !Array.isArray(uploadData.fileList) || uploadData.fileList.length === 0) {
  //     console.log('⚠️ fileList không hợp lệ hoặc rỗng');
  //     return;
  //   }

  //   const file = uploadData.fileList[0];
  //   console.log('📁 file:', file);

  //   if (!file.url && !file.preview) {
  //     console.log('🔄 Chưa có url/preview, bắt đầu đọc file...');
  //     try {
  //       file.preview = await getBase64(file.originFileObj);
  //       console.log('✅ file.preview:', file.preview);
  //       setStateProduct({
  //         ...stateProduct,
  //         image: file.preview
  //       })
  //     } catch (error) {
  //       console.error('Lỗi khi chuyển file sang base64:', error);
  //     }
  //   } else {
  //     setAvatar(file.preview || file.url);
  //   }
  // };
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
    setStateProduct((prev) => ({ ...prev, image: preview }));
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
    setStateProductDetails((prev) => ({ ...prev, image: preview }));
    console.log('preview length:', preview.length);
  } catch (error) {
    console.error('Lỗi khi nén hoặc chuyển file sang base64:', error);
  }
};
const typeList = TypeProduct?.data?.data?.data || [];

  return (
    <div>
    <WrapperHeader>Quản lý Sản Phẩm </WrapperHeader>
    <div style={{marginTop:'10px'}}>
        <Button style={{height : '150px' ,width : '150px' , borderRadius: '6px', borderStyle:'dashed'}} onClick={() => setIsModelOpen(true) }  ><PlusCircleFilled style={{fontSize: '60px'}}/></Button>
    </div>
    <div style={{ marginTop : '20px'}}>
    <TableComponent  columns={columns} isLoading={isLoadingProduct} data={dataTable} handleDeleteManyProduct={handleDeleteManyProduct} onRow={(record , rowIndex)  => {
      return {
        onClick: event => {
          SetRowSelected(record._id)
          console.log("Clicked row id: ", record._id);
        }
      }
    }} />
    </div>
    <Modal
        title="Tạo Sản Phẩm"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        okButtonProps={{display : 'none'}}
      >
      <Loading isPending={isPending}>
        <Form
          name="name"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="on"
          //form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input your Typiuiuiuiuiu!' }]}
            >
                <Select
                  name= "type"
                  onChange={handleChangeSelect}
                  value={stateProduct.type}
                  options={renderOptions(Array.isArray(typeList) ? typeList : [])}
                />
          </Form.Item>
           {stateProduct.type === 'add_type' && (
            <Form.Item
                label="New type"
                name="newType"
                rules={[{ required: true, message: 'Please input your Typeeeeeee!' }]}
            >
                    <InputComponent value={stateProduct.newType} onChange={handleOnChange} name="newType"/>         
            </Form.Item>
           )}
          <Form.Item
            label="CountInStock"
            name="countInStock"
            rules={[{ required: true, message: 'Please input your Count In Stock!' }]}
            >
            <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock"/> 
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input your Price!' }]}
            >
            <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price"/> 
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please input your rating!' }]}
            >
            <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" /> 
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your Decription!' }]}
            >
            <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description"/> 
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: 'Please input your Image!' }]}
            >
            <WrapperUpLoadFile onChange={handleOnchangeAvatar} maxCount={1} beforeUpload={() => false}>
              <Button>Select File</Button>
            {stateProduct?.image && (
              <img
                src={stateProduct?.image}
                style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft:'10px'
                }}
                alt="avatar"
              />
            )}     
            </WrapperUpLoadFile>     
            </Form.Item>
          <Form.Item  wrapperCol={{offset : 8 ,span : 16}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </Loading>
      </Modal>
      <DrawComponent title='chi tiết sản phẩm' isopen={isOpenDraw} onClose={() => SetIsOpenDraw(false)} width="90%" >
                  <Loading isPending={isLoadingUpdate}>
        <Form
          name="basic"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
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
            <InputComponent value={stateProductDetails['name']} onChange={handleOnChangeDetails} name="name" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input your Type!' }]}
            >
            <InputComponent value={stateProductDetails['type']} onChange={handleOnChangeDetails} name="type" /> 
          </Form.Item>
          <Form.Item
            label="CountInStock"
            name="countInStock"
            rules={[{ required: true, message: 'Please input your Count In Stock!' }]}
            >
            <InputComponent value={stateProductDetails['CountInStock']} onChange={handleOnChangeDetails} name="countInStock"/> 
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input your Price!' }]}
            >
            <InputComponent value={stateProductDetails['price']} onChange={handleOnChangeDetails} name="price"/> 
          </Form.Item>
          <Form.Item
            label="rating"
            name="rating"
            rules={[{ required: true, message: 'Please input your rating!' }]}
            >
            <InputComponent value={stateProductDetails['rating']} onChange={handleOnChangeDetails} name="rating" /> 
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your Decription!' }]}
            >
            <InputComponent value={stateProductDetails['Descriptions']} onChange={handleOnChangeDetails} name="decription"/> 
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: 'Please input your Image!' }]}
            >
            <WrapperUpLoadFile onChange={handleOnchangeAvatarDetails} maxCount={1} beforeUpload={() => false}>
              <Button>Select File</Button>
            {stateProductDetails?.image && (
              <img
                src={stateProductDetails?.image}
                style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft:'10px'
                }}
                alt="avatar"
              />
            )}   
            </WrapperUpLoadFile>       
            </Form.Item>
          <Form.Item  wrapperCol={{offset : 6 ,span : 16}}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form></Loading>
      </DrawComponent>
      <ModalComponent
        title="Xóa Sản Phẩm"
        closable={{'aria-label': 'Custom Close Button' }}
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
        okButtonProps={{display : 'none'}}
      >
      <div>bạn có chắc muốn xóa sản phẩm này không ?</div>
      </ModalComponent>
    </div>
  )
};
const WrappedProfilePage = () => (
  <App>
    <AdminProduct />
  </App>
);
export default WrappedProfilePage;