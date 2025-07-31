import React from 'react'
import {Drawer } from 'antd'


const DrawComponent = ({title = 'Drawer', placement = 'right',isopen = false,children, ...rests   }) => {
  return(
  <>
      <Drawer
        title={title}
        placement={placement}
        open={isopen}
        {...rests}
      >
      {children}
      </Drawer>
    </>
    )
}
export default DrawComponent