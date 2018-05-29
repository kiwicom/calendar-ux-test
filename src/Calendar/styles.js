import styled from 'styled-components';

export const Container = styled.div`
    width: 350px;
`;

export const Title = styled.h3`
    text-align: center;
    font-size: 20px;
`;

export const DaysContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 50px);
    grid-template-rows: 50px;
`;

export const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 50px);
    grid-template-rows: repeat(5, 50px)
`;

export const Day = styled.div`
    grid-column-start: ${props => (props.startAt ? props.startAt : 'auto')};
    text-align: center;
`;
