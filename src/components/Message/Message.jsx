import {message} from 'antd';

const success = (mes = 'Success') => {
    message.warning(mes);
};

const error = (mes = 'Error') => {
    message.warning(mes);
};

const warning = (mes = 'Warning') => {
    message.warning(mes);
}
export { success, error, warning };
