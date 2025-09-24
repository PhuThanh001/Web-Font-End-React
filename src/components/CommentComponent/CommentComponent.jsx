import React from 'react'
import { useEffect } from "react";

const CommentComponent = (props) => {
    const  {dataHref ,width} = props
    useEffect(() => {
    // Gọi parse lại sau khi component được render
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [dataHref]); // chạy lại nếu dataHref thay đổi
    return (
        <div style={{margin : '-10px -12px 0 ' }} className='testt'>
            <div className="fb-comments" data-href={dataHref} data-width={width || "100%"} data-numposts="5"></div>
        </div>
    )
}

export default CommentComponent