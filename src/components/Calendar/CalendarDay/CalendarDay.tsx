import { Dispatch, SetStateAction } from "react";
import { Days, ModalPropMonthData, ModalPropMonthArrData } from "../../../Types/types";

const CalendarDay: React.FC<{
    index: number,
    active: boolean,
    setMonthsArr: Dispatch<SetStateAction<{ id: string; month: string; days: Days[]; }[]>>,
    currentMonth: string,
    markCurrentDay: boolean,
    monthsArr: { id: string; month: string; days: Days[]; }[],
    modalVisibilityHandler: (clickedMonthData: ModalPropMonthData, monthData: ModalPropMonthArrData) => void,
    greenDot: boolean,
}> = ({index, currentMonth, markCurrentDay, monthsArr, setMonthsArr, modalVisibilityHandler, active, greenDot}) => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const id = `${index + 1}__${currentMonth}`;
    const classes = `calendar__item ${(index + 1) === parseInt(day) && markCurrentDay ? 'calendar__item--currentDay' : ''}`;
    const content = index + 1;

    const calendarDayClickHandler = (id: string) => {
        const splitedId = id.split('__');

        const clickedCurrentMonthIndex = monthsArr.findIndex((ele: { id: string; month: string; days: any; }) => {
            return ele.month === splitedId[1]
        });

        const copyMonthsArr = [...monthsArr];
        copyMonthsArr[clickedCurrentMonthIndex].days.forEach((ele) => {
            if(ele.id === parseInt(splitedId[0]) - 1){
                ele.active = true;
            }else ele.active = false;
            return ele;
        });

        modalVisibilityHandler(splitedId, {monthsArr, setMonthsArr});
    }

    return (
        <li id={id} className={`${classes} ${active ? 'calendar__item--active' : ''}`} onClick={() => calendarDayClickHandler(id)}>
            {content}
            {greenDot && <div className='calendar__item--greenDot'></div>}
        </li>
    )
};

export default CalendarDay;