import { message } from 'antd';

const success = (mes = 'Success') => {
    message.success(mes); // ✅ đúng loại
};

const error = (mes = 'Error') => {
    message.error(mes); // ✅ đúng loại
};

const warning = (mes = 'Warning') => {
    message.warning(mes); // ✅ đúng loại
};

export { success, error, warning };
