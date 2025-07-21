import { Spin } from 'antd'
import React from 'react'

const Loading = ({ children, isPending , delay = 200, tip = "Loading..." }) => {
  return (
    <Spin spinning={isPending} delay={delay} tip={tip}>
      {children}
    </Spin>
  )
}
export default Loading