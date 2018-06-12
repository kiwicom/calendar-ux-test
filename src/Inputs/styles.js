// @noflow
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: flex-start;
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 250px;
    height: 40px;
    cursor: pointer;
    margin-top: 10px;
    margin-right: 12px;
    padding:0 12px;
    border-radius: 3px;
    background-color: #ffffff;
    border: solid 1px #bac7d5;
    ${props => (props.active ? `
        background-color: rgba(224, 246, 255, 0.16);
        border: solid 2px #0176d2;
    ` : '')}
`;

export const LengthContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    height: 40px;
    cursor: pointer;
    margin-top: 10px;
    padding:0 12px;
    border-radius: 3px;
    background-color: #ffffff;
    border: solid 1px #bac7d5;
    ${props => (props.active ? `
    background-color: rgba(224, 246, 255, 0.16);
    border: solid 2px #0176d2;
    ` : '')}
`;

export const AnyTimeIcon = styled.img`
    margin-left: 10px;
`;
