import styled from 'styled-components';
import { Upload } from 'antd';

export const WrapperHeader = styled.h1`
    color : #000;
    font-size: 14px

`
export const WrapperUpLoadFile = styled(Upload)`
    & .ant-upload-list-item.ant-upload-list-item-undefined {
        width: 60px;
        height: 60px;
        border-radius: 50%
    }
    & .ant-upload-list-item-name {
        display: none
    }
`