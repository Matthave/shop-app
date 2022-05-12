import { useState, useEffect } from "react";
import CalendarSlider from "./CalendarSlider/CalendarSlider";
import { prepareDayFormat } from "../../utils/prepareDateFormat";
import CalendarDay from "./CalendarDay/CalendarDay";
import { setDaysToMonth } from "../../utils/setDaysToMonth";

const d = new Date();
const Calendar: React.FC = () => {
    const [month, setMonth] = useState(String(d.getMonth() + 1).padStart(2, '0'));
    const [year, setYear] = useState(d.getFullYear());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState({id: 0, value: 'Mon'});
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

    useEffect(() => {
        const fullDate = new Date(year, parseInt(month) - 1, 1, 0);
        const dayOfDate = fullDate.toString().split(' ')[0];
        const numberOfVoidDays = daysArr.filter((day) => day.value === dayOfDate);
        setFirstDayOfMonth(numberOfVoidDays[0]);
     }, [year, month]);

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

        setMonth(anotherMonthPrepString)
     }

     console.log(isLeapYear);

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
                {emptyDays.map((ele) => <li id={`empty__${ele}`} className='calendar__item calendar__item--empty'></li>)}
                {currentMonth!.days instanceof Array ? currentMonth!.days.map((ele, index) => {
                    return <CalendarDay 
                    index={index} 
                    setMonthsArr={setMonthsArr}
                    currentMonth={currentMonth!.month} 
                    markCurrentDay={markCurrentDay}
                    monthsArr={monthsArr}
                    />
                }) : '' }
            </ul>
        </div>
    )
}

export default Calendar;