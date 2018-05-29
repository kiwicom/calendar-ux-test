import styled from 'styled-components';

export const Container = styled.div`
    float: left;
    width: 350px;
`;

export const Title = styled.h3`
    text-align: center;
    font-size: 20px;
`;

export const CalendarContainer = styled.div`
display: grid;
grid-template-columns: 50px 50px 50px 50px 50px 50px 50px;
`;

export const Day = styled.div`
    grid-column-start: ${props => (props.startAt ? props.startAt : 'auto')};
    text-align: center;
`;
