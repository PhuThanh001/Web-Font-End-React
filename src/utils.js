export const isjsonstring = (data) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return false;
    }
    return 
}