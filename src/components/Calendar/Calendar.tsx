import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import CalendarSlider from "./CalendarSlider/CalendarSlider";
import { prepareDayFormat } from "../../utils/prepareDateFormat";
import CalendarDay from "./CalendarDay/CalendarDay";
import { setDaysToMonth } from "../../utils/setDaysToMonth";
import { ModalPropMonthData, ModalPropMonthArrData } from '../../Types/types';
import { clearActiveDays } from "../../utils/clearActiveDays";

const d = new Date();
const Calendar: React.FC<{modalVisibilityHandler: (clickedMonthData: ModalPropMonthData, monthData: ModalPropMonthArrData) => void,
    setModalVisibility: Dispatch<SetStateAction<boolean>>,
}> = ({modalVisibilityHandler, setModalVisibility}) => {
    const [month, setMonth] = useState(String(d.getMonth() + 1).padStart(2, '0'));
    const [year, setYear] = useState(d.getFullYear());
    const markCurrentDay =  prepareDayFormat(d.getMonth() + 1) === month;
    const isLeapYear = year % 4 === 0 ? 29 : 28 ;
    
    const daysArr = [
        {id: 0, value: 'Mon'},
        {id: 1, value: 'Tue'},
        {id: 2, value: 'Wed'},
        {id: 3, value: 'Thu'},
        {id: 4, value: 'Fri'},
        {id: 5, value: 'Sat'},
        {id: 6, value: 'Sun'}
    ];

    let firstDayOfMonth = {id: 0, value: 'Mon'};
    const fullDate = new Date(year, parseInt(month) - 1, 1, 0);
    const dayOfDate = fullDate.toString().split(' ')[0];
    const numberOfVoidDays = daysArr.filter((day) => day.value === dayOfDate);
    firstDayOfMonth = numberOfVoidDays[0];

     const monthsArrDefault = [
        { id: '01', month: 'Jan', days: setDaysToMonth(31) },
        { id: '02', month: 'Feb', days: setDaysToMonth(isLeapYear)},
        { id: '03', month: 'Mar', days: setDaysToMonth(31) },
        { id: '04', month: 'Apr', days: setDaysToMonth(30) },
        { id: '05', month: 'May', days: setDaysToMonth(31) },
        { id: '06', month: 'Jun', days: setDaysToMonth(30) },
        { id: '07', month: 'Jul', days: setDaysToMonth(31) },
        { id: '08', month: 'Aug', days: setDaysToMonth(31) },
        { id: '09', month: 'Sep', days: setDaysToMonth(30) },
        { id: '10', month: 'Oct', days: setDaysToMonth(31) },
        { id: '11', month: 'Nov', days: setDaysToMonth(30) },
        { id: '12', month: 'Dec', days: setDaysToMonth(31) },
    ];

    const [monthsArr, setMonthsArr] = useState(monthsArrDefault);
    const currentMonth = monthsArr.find((currMonth) => currMonth.id === month);
    const emptyDays = Array.from(Array(firstDayOfMonth.id).keys());

    const calendarSliderFunc = (direction: string) => {
        let anotherMonth = direction === 'right' ? parseInt(month) + 1 : parseInt(month) - 1;
        let anotherMonthPrepString = prepareDayFormat(anotherMonth);

        if(anotherMonthPrepString === '13') {
            setYear((prevState) => {
                return prevState + 1;
            });
            return setMonth('01');
        };

        if(anotherMonthPrepString === '00'){
            setYear((prevState) => {
                return prevState - 1;
            });
            return setMonth('12');
        };

        setMonthsArr(clearActiveDays(monthsArr));
        setModalVisibility(false);
        setMonth(anotherMonthPrepString)
     }

    return (
        <div className='calendar'>
        <CalendarSlider 
        currentMonth={monthsArr.filter((ele) => ele.id === month)[0]} 
        currentYear={year} 
        calendarSliderFunc={calendarSliderFunc}/>
            <ul className='calendar__list'>
                <li className='calendar__weekDay'>Mon</li>
                <li className='calendar__weekDay'>Tue</li>
                <li className='calendar__weekDay'>Wed</li>
                <li className='calendar__weekDay'>Thu</li>
                <li className='calendar__weekDay'>Fri</li>
                <li className='calendar__weekDay'>Sat</li>
                <li className='calendar__weekDay'>Sun</li>
            </ul>
            <ul className="calendar__list">
                {emptyDays.map((ele) => <li key={`${ele}-${currentMonth!.month}`} id={`empty__${ele}`} className='calendar__item calendar__item--empty'></li>)}
                {currentMonth!.days instanceof Array ? currentMonth!.days.map((ele: any, index) => {
                    const { breakfast, brunch, lunch, snacks, dinner} = ele;
                    const greenDot = breakfast.name || brunch.name || lunch.name || snacks.name || dinner.name;
                    return <CalendarDay 
                    index={index} 
                    active={ele.active}
                    setMonthsArr={setMonthsArr}
                    currentMonth={currentMonth!.month} 
                    markCurrentDay={markCurrentDay}
                    monthsArr={monthsArr}
                    modalVisibilityHandler={modalVisibilityHandler}
                    greenDot={greenDot !== ''}
                    key={`${index + 1}__${currentMonth}`}
                    />
                }) : '' }
            </ul>
        </div>
    )
}

export default Calendar;