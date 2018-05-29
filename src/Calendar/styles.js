import styled from 'styled-components';

export const Container = styled.div`
    width: 350px;
    &:first-child {
        margin-right:20px;
    }
`;

export const DaysContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 50px);
    grid-template-rows: 25px;
`;

export const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 50px);
    grid-template-rows: repeat(5, 50px)
`;

export const Day = styled.div`
    grid-column-start: ${props => (props.startAt ? props.startAt : 'auto')};
    text-align: center;
    padding-top: 10px;
`;
export const MonthContainer = styled.div`
    margin: 25px 0;
`;
export const MonthButton = styled.div`
    display:inline;
    border-radius: 3px;
    padding: 10px 15px;
    background-color: #f5f7f9;
`;
