import React from 'react'
import { Space, Spin } from 'antd';


export default function spinner() {
    return (
        <div>
            <Space size="middle">
                <Spin size="small" />
                <Spin />
                <Spin size="large" />
            </Space>
        </div>
    )
}
