import React from 'react'
import { useEffect } from "react";

const LikeButtonComponent = (props) => {
    const  {dataHref} = props
    useEffect(() => {
    // Gọi parse lại sau khi component được render
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [dataHref]); // chạy lại nếu dataHref thay đổi
    return (
        <div style={{margin : '20px 0'}}>
            <div className="fb-like" data-href={dataHref} data-width="" data-layout="" data-action="" data-size="" data-share="true"></div>
        </div>
    )
}
export default LikeButtonComponent