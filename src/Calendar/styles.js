// @noflow
import styled from 'styled-components';

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

export const NavigationIcon = styled.img`
    width: 8px;
`;

export const CalendarWraper = styled.div`
    display: flex;
`;

export const Container = styled.div`
    width: 350px;
    &:first-child {
        margin-right:20px;
    }
`;

export const DaysContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 50px);
    grid-template-rows: 35px;
`;
export const DayName = styled.div`
    height: 50px;
    cursor: pointer;
    text-align: center;
    padding-top: 10px;
    border: solid 1px transparent;
`;

export const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 50px);
    grid-template-rows: repeat(5, 50px)
`;

export const MonthContainer = styled.div`
    display: flex;
    flex: 1;
    cursor: pointer;
    margin: 15px 0 0;
    justify-content: center;
    align-items: center;
`;
export const MonthButton = styled.div`
    display:inline;
    border-radius: 3px;
    padding: 7px 15px;
    background-color: #f5f7f9;
`;

export const DateTypography = styled.span`
    font-size: ${props => (props.fontSize ? props.fontSize : '16px')};
    color: ${props => (props.color ? props.color : 'white')};
`;
export const DayContainer = styled.div`
    position:relative
    grid-column-start: ${props => (props.startAt ? props.startAt : 'auto')};
`;
export const DayContentContainer = styled.div`
    height: 100%;
    cursor: pointer;
    text-align: center;
    padding-top: 10px;
    border: solid 1px transparent;
    ${props => (props.isFirst ?
    'border-top-left-radius: 3px;border-bottom-left-radius: 3px;cursor:ew-resize;' :
    '')}
    ${props => (props.isLast ?
    'border-top-right-radius: 3px;border-bottom-right-radius: 3px;cursor:ew-resize;' :
    '')}
    ${props => (props.active ?
    'background-color:#0176d2;color: white;'
    : '')}
    ${props => (!props.active && !props.past ?
    `&:hover {
        border-radius: 3px;
        background-color: #fcffff;
        border-color: #0176d2;
    }`
    : '')}
`;
export const DayDrag = styled.div`
    z-index: 10;
    position: absolute;
    height: 40px;
    width:12px;
    top: 50%;
    text-align:center;
    color: white;
    cursor:ew-resize;
    border-radius: 2px;
    ${props => (props.last ?
    'right: -5px;'
    :
    'left: -5px;'
  )}
    margin-top: -20px;
    background: #46515e
`;

export const DragIcon = styled.img`
    margin-top: 16px;
`;
