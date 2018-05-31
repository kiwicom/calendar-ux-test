// @noflow
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e8edf1;
`;

export const InputContainer = styled.div`
    cursor: pointer;
    padding-bottom: 10px;
    margin-right: 25px;
    border-bottom: ${props => (props.active ? '3px solid #0176d2' : 'none')};
`;

export const AnyTimeIcon = styled.img`
    margin-left: 10px;
`;
