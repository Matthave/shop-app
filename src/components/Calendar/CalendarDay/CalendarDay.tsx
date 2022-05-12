import { Dispatch, SetStateAction } from "react";

interface days {
    id: number,
    breakfast: string,
    branch: string,
    lunch: string,
    tea: string,
    dinner: string
}

const CalendarDay: React.FC<{
    index: number,
    setMonthsArr: Dispatch<SetStateAction<{ id: string; month: string; days: days[]; }[]>>,
    currentMonth: string,
    markCurrentDay: boolean,
    monthsArr: { id: string; month: string; days: days[]; }[],
}> = ({index, currentMonth, markCurrentDay, monthsArr, setMonthsArr}) => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const id = `${index + 1}__${currentMonth}`;
    const classes = `calendar__item ${(index + 1) === parseInt(day) && markCurrentDay ? 'calendar__item--currentDay' : ''}`;
    const content = index + 1;

    const calendarDayClickHandler = (id: string) => {
        const copyMonthsArr = [...monthsArr];
        const splitedId = id.split('__');
        const clickedMonthIndex = monthsArr.findIndex((ele) => ele.month === splitedId[1]);
        
        copyMonthsArr[clickedMonthIndex].days[parseInt(splitedId[0]) - 1].breakfast = 'CHUJÓW STO';
        setMonthsArr(copyMonthsArr);
    }

    return <li id={id} key={id} className={classes} onClick={() => calendarDayClickHandler(id)}>{content}</li>;
};

export default CalendarDay;