import styled from "styled-components";

export const WrapperProducts = styled.div`
    display:flex ;
    align-items: flex-start;
    margin-top: 10px
`
export const WrapperNameProduct = styled.div`
    display:flex ;
    align-items: flex-start;
    width: 670px
`
export const WrapperItem = styled.div`
    width: 200px;
    font-weight: bold;
    &:last-child {
        color : red
    }
`
export const WrapperItemLabel = styled.div`
    width: 200px ;
    &:last-child {
        font-weight : bold;
    }
`
export const WrapperAllPrice = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end
`