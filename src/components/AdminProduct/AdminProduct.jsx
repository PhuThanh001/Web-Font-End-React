import React from 'react'
import TableComponent from '../TableComponent/TableComponent'
import { Table } from 'antd';
import { WrapperHeader } from './style';
import {PlusCircleFilled} from '@ant-design/icons'
import {Button} from 'antd'

const AdminProduct = () => {
  return (
    <div>
    <WrapperHeader>Quản lý Sản Phẩm </WrapperHeader>
    <div style={{marginTop:'10px'}}>
        <Button style={{height : '150px' ,width : '150px' , borderRadius: '6px', borderStyle:'dashed'}} ><PlusCircleFilled style={{fontSize: '60px'}}/></Button>
    </div>
    <div style={{ marginTop : '20px'}}>
    <TableComponent/>
    </div>
    
    </div>
  )
}

export default AdminProduct