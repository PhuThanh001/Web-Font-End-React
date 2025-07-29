import React, { useEffect, useState ,useQuery } from 'react'
import TableComponent from '../TableComponent/TableComponent'
import { Descriptions, Table } from 'antd';
import { WrapperHeader } from './style';
import {DeleteOutlined, PlusCircleFilled} from '@ant-design/icons'
import {Button ,App,Form} from 'antd'
import Input from 'antd/es/input/Input';
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils';
import { useMutationHook } from '../../hooks/useMutationHook';
import { ProductService } from '../../service/ProductService';
import Loading from '../LoadingComponent/loading';
import DrawComponent from '../DrawComponent/DrawComponent';


const AdminProduct = () => {
  const { message: messageApi } = App.useApp(); // Lấy message từ context
  const [isModalOpen , setIsModelOpen] = useState(false)
  const [rowSelected , SetRowSelected] = useState('')
  const [isOpenDraw, SetIsOpenDraw] = useState(false)
  const [isLoadingUpdate , SetIsLoadingUpdate] = useState(false)
  const user = useSelector((state) => state?.user)
  
  const [stateProduct , setStateProduct] = useState({
    name: '',
    price:'',
    type:'',
    Descriptions:'',
    rating:'',
    image:'',
    CountInStock:''
  })

  const [stateProductDetails , setStateProductDetails] = useState({
    name: '',
    price:'',
    type:'',
    Descriptions:'',
    rating:'',
    image:'',
    CountInStock:''
  })

  const fetchGetDetailsProduct = async () =>{
    const res = await ProductService.fetchGetDetailsProduct(rowSelected)
    if(res?.data){
      setStateProductDetails({
        name: res?.data.name,
        price: res?.data.price,
        type: res?.data.type,
        Descriptions: res?.data.description,
        rating: res?.data.rating,
        image: res?.data.image,
        CountInStock: res?.data.CountInStock
      })
    }
    SetIsLoadingUpdate(false)
  } 
  
  useEffect(() => {
    setStateProductDetails(stateProductDetails)
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
      SetIsLoadingUpdate(true)
      fetchGetDetailsProduct()
    }
    SetIsOpenDraw(true)
  }
  const { data, isPending , isError , isSuccess } = mutation;
  const { data:dataUpdate, isPending:isPendingUpdate , isError:isErrorUpdate , isSuccess:isSuccessUpdate } = mutationUpdate;

  const {isLoading: isLoadingProduct , data: products} = useQuery({queryKey: ['products'] , queryFn: getAllProducts})
  
  const renderAction = () => {
    return (
      <div>
          <DeleteOutlined style={{color : 'red' , fontSize: '30px', cursor:'pointer'}}/>
          <EditOutlined style={{color: 'orange' , fontSize:'30ox' , cursor:'pointer' }} onClick={handleDetailsProduct}/>
      </div>
    )
  }
  console.log('products' , products)

  const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'Price',
        },
        {
            title: 'Rating',
            dataIndex: 'Rating',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: renderAction
        }
    ];

  const dataTable = products?.data?.length && products?.data?.map((product) => {
     return{...product, key: product._id} 
        }) 
    useEffect(() => {
      console.log('isSuccess:', isSuccess, 'isError:', isError);
      if (isSuccess && data?.status ==='ok') {
        console.log('Trước khi gọi messageApi.success');
        messageApi.success('Cập nhật thành công!');
        handleCloseDrawer()
        console.log('Sau khi gọi messageApi.success');
      } else if (isError) {
        console.log('Trước khi gọi messageApi.error');
        messageApi.error('Cập nhật thất bại!');
        console.log('Sau khi gọi messageApi.error');
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
    form.resetField()
  }
    const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    console.log('product ', res)
  }

  
  const [avatar, setAvatar] = useState('');
  const [form] = Form.useForm();
  
  const mutation = useMutationHook((data) => {
    const {
      name ,
      price ,
      description ,
      rating ,
      CountInStock,
      image,
      type,
    } = data
    const res = ProductService.CreateProduct({
      name,
      price,
      description,
      rating ,
      CountInStock ,
      image,
      type
    })
    return res
  })
  const mutationUpdate = useMutationHook((data) => {
    console.log('data' , data)
    const {
      id ,
      token,
      ...rests
    } = data
    const res = ProductService.UpdateProduct(
      id,
      token,
      ...rests
    )
    return res
  })

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
    form.resetField()
  }

  const onFinish = () => {
    mutation.mutate(stateProduct)  
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
  const OnUpdateProduct = () => {
      mutationUpdate.mutate({id: rowSelected , token : user?.access_token , stateProductDetails})
  }
  const handleOnchangeAvatar = async (uploadData) => {
    console.log('🔥 uploadData:', uploadData);
    if (!uploadData || !uploadData.fileList || !Array.isArray(uploadData.fileList) || uploadData.fileList.length === 0) {
      console.log('⚠️ fileList không hợp lệ hoặc rỗng');
      return;
    }

    const file = uploadData.fileList[0];
    console.log('📁 file:', file);

    if (!file.url && !file.preview) {
      console.log('🔄 Chưa có url/preview, bắt đầu đọc file...');
      try {
        file.preview = await getBase64(file.originFileObj);
        console.log('✅ file.preview:', file.preview);
        stateProduct({
          ...stateProduct,
          image: file.preview
        })
      } catch (error) {
        console.error('Lỗi khi chuyển file sang base64:', error);
      }
    } else {
      setAvatar(file.preview || file.url);
    }
  };
    const handleOnchangeAvatarDetails = async (uploadData) => {
    console.log('🔥 uploadData:', uploadData);
    if (!uploadData || !uploadData.fileList || !Array.isArray(uploadData.fileList) || uploadData.fileList.length === 0) {
      console.log('⚠️ fileList không hợp lệ hoặc rỗng');
      return;
    }
    const file = uploadData.fileList[0];
    console.log('📁 file:', file);

    if (!file.url && !file.preview) {
      console.log('🔄 Chưa có url/preview, bắt đầu đọc file...');
      try {
        file.preview = await getBase64(file.originFileObj);
        console.log('✅ file.preview:', file.preview);
                stateProductDetails({
          ...stateProductDetails,
          image: file.preview
        })
      } catch (error) {
        console.error('Lỗi khi chuyển file sang base64:', error);
      }
    } else {
      setAvatar(file.preview || file.url);
    }
  };
  return (
    <div>
    <WrapperHeader>Quản lý Sản Phẩm </WrapperHeader>
    <div style={{marginTop:'10px'}}>
        <Button style={{height : '150px' ,width : '150px' , borderRadius: '6px', borderStyle:'dashed'}} onClick={() => onFinish() }  ><PlusCircleFilled style={{fontSize: '60px'}}/></Button>
    </div>
    <div style={{ marginTop : '20px'}}>
    <TableComponent colums={columns} isLoading={isLoadingProduct} data={dataTable} onRow={(record , rowIndex) => {
      return {
        onClick: event => {
          SetRowSelected()
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
            name="Name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="Type"
            rules={[{ required: true, message: 'Please input your Type!' }]}
            >
            <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" /> 
          </Form.Item>
          <Form.Item
            label="CountInStock"
            name="CountInStock"
            rules={[{ required: true, message: 'Please input your Count In Stock!' }]}
            >
            <InputComponent value={stateProduct.CountInStock} onChange={handleOnChange} name="countInStock"/> 
          </Form.Item>
          <Form.Item
            label="Price"
            name="Price"
            rules={[{ required: true, message: 'Please input your Price!' }]}
            >
            <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price"/> 
          </Form.Item>
          <Form.Item
            label="rating"
            name="rating"
            rules={[{ required: true, message: 'Please input your rating!' }]}
            >
            <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" /> 
          </Form.Item>
          <Form.Item
            label="Description"
            name="Decription"
            rules={[{ required: true, message: 'Please input your Decription!' }]}
            >
            <InputComponent value={stateProduct.Descriptions} onChange={handleOnChange} name="decription"/> 
          </Form.Item>
          <Form.Item
            label="Image"
            name="Image"
            rules={[{ required: true, message: 'Please input your Image!' }]}
            >
            <WrapperUpLoadFile onChange={handleOnchangeAvatar} maxCount={1} beforeUpload={() => false}>
              <Button>Select File</Button>
            </WrapperUpLoadFile>
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
            </Form.Item>
          <Form.Item  wrapperCol={{offset : 6 ,span : 16}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form></Loading>
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
            name="Name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <InputComponent value={stateProductDetails['name']} onChange={handleOnChangeDetails} name="name" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="Type"
            rules={[{ required: true, message: 'Please input your Type!' }]}
            >
            <InputComponent value={stateProductDetails['type']} onChange={handleOnChangeDetails} name="type" /> 
          </Form.Item>
          <Form.Item
            label="CountInStock"
            name="CountInStock"
            rules={[{ required: true, message: 'Please input your Count In Stock!' }]}
            >
            <InputComponent value={stateProductDetails['CountInStock']} onChange={handleOnChangeDetails} name="countInStock"/> 
          </Form.Item>
          <Form.Item
            label="Price"
            name="Price"
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
            name="Decription"
            rules={[{ required: true, message: 'Please input your Decription!' }]}
            >
            <InputComponent value={stateProductDetails['Descriptions']} onChange={handleOnChangeDetails} name="decription"/> 
          </Form.Item>
          <Form.Item
            label="Image"
            name="Image"
            rules={[{ required: true, message: 'Please input your Image!' }]}
            >
            <WrapperUpLoadFile onChange={handleOnchangeAvatarDetails} maxCount={1} beforeUpload={() => false}>
              <Button>Select File</Button>
            </WrapperUpLoadFile>
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
            </Form.Item>
          <Form.Item  wrapperCol={{offset : 6 ,span : 16}}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form></Loading>
      </DrawComponent>
    </div>
  )
}
const WrappedProfilePage = () => (
  <App>
    <ProfilePage />
  </App>
);
export default WrappedProfilePage;