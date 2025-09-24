export const isjsonstring = (data) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false;
    }
    return true
}
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  export const renderOptions = (arr = []) => {
          let results = []
          if(arr) {
            results = arr?.map((opt) =>{
              return {
                value: opt,  
                label: opt
              }
            } )
          }
          console.log('arr:', arr, 'isArray:', Array.isArray(arr))
          results.push({
            label: 'Thêm type' ,
            value: 'add_type'
          })
          return results
    }
export const convertPrice = (price) => {
  try {
    // ép về dạng number trước
    const numberPrice = Number(price);
    if (isNaN(numberPrice)) return null;

    const result = numberPrice.toLocaleString().replaceAll(',', '.');
    return `${result} VND`;
  } catch (error) {
    return null;
  }
};
export const initFacebookSdk = () => {
    // Nếu đã có FB rồi thì resolve luôn
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    let locale = 'vi_VN'; // đặt mặc định là tiếng việt
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_APP_FB_ID, // thay bằng appId của bạn
        cookie: true,
        xfbml: true,
        version: 'v18.0', // Update to the latest version if needed
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/" + locale + "/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  
};
