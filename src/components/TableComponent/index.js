import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Divider, Radio, Table } from 'antd';
function TableComponent({ columns, data1, onRow }) {
    const selectionType = 'checkbox';

    const columns1 = [...columns];
    // console.log('columns', columns);
    const data = [...data1];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };
    return (
        <div>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns1}
                dataSource={data}
                onRow={onRow}
            />
        </div>
    );
}

export default TableComponent;
