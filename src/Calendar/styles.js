import styled from 'styled-components';

export const CalendarContainer = styled.div`
display: grid;
grid-template-columns: 50px 50px 50px 50px 50px 50px 50px;
`;

export const Day = styled.div`
    grid-column-start: ${props => (props.startAt ? props.startAt : 'auto')};
    text-align: center;
`;
