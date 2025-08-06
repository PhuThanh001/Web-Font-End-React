import { Dropdown, Space, Table } from 'antd';
import React, { useMemo, useState } from 'react'
import Loading from '../LoadingComponent/loading';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Excel } from 'antd-table-saveas-excel';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data:dataSource = [], isLoading = false, columns = [], onRow , handleDeleteManyProduct } = props;
    const [rowSelectedKeys , setRowSelectedKeys] = useState([])
    const newColumnsExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])

    const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnsExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");

    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
    };

    const handleDeleteAll = () => {
        handleDeleteManyProduct(rowSelectedKeys)
    }
    return (
        <Loading isPending={isLoading}>
        {rowSelectedKeys.length &&(
            <div style={{
            background: '#1d1ddd',
            color: '#fff',
            fontweight: 'bold',
            padding:'10px'
        }} onClick={handleDeleteAll}>
            xóa tất cả
        </div>
        )}        
        <button style={{
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }} onClick={exportExcel}> export file excel</button>
        <Table
            rowSelection={{ type: selectionType, ...rowSelection }}
            columns={columns}
            dataSource={dataSource}
            loading={isLoading}
            onRow={onRow} 
        /></Loading>

    )
}   
export default TableComponent