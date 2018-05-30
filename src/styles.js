// @noflow
import styled from 'styled-components';

export const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
`;
export const Navigation = styled.div`
    cursor: pointer;
    display: flex;
    position:absolute;
    ${props => (props.left ? 'left: -15px' : 'right: -15px')}
    top: 50%;
    width: 30px;
    height: 60px;
    margin-top: -30px;
    border-radius: 3px;
    background-color: #46515e;
    color: white;
    justify-content: center;
    align-items: center;
`;
