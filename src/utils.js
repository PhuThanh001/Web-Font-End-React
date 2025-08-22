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