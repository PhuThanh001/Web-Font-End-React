import { Table } from 'antd';
import React from 'react'
import Loading from '../LoadingComponent/loading';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], isLoading = false, columns = [], onRow } = props;

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    return (
        <Table
            rowSelection={{ type: selectionType, ...rowSelection }}
            columns={columns}
            dataSource={data}
            loading={isLoading}
            onRow={onRow} 
        />
    )
}


export default TableComponent