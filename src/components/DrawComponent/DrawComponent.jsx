import React from 'react'

const DrawComponent = ({title = 'Drawer', placement = 'right',isopen = false,children, ...rests   }) => {
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
}

export default DrawComponent